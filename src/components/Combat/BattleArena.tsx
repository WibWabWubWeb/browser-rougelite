import React, { useState, useEffect } from 'react';
import './BattleArena.css';
import type { Unit } from '../../types/game';
import { calculateDamage } from '../../logic/combat';

interface Effect {
  type: 'Thermal' | 'Ion' | 'Toxic' | 'Kinetic' | 'Laser' | 'Cryo';
  source: 'player' | 'enemy';
  id: number;
}

interface DamageNumber {
  id: number;
  value: number;
  source: 'player' | 'enemy';
}

interface BattleArenaProps {
  playerSquad: Unit[];
  enemySquad: Unit[];
  onBattleEnd: (result: 'victory' | 'defeat', updatedHPs: Record<string, number>) => void;
}

interface BattleState {
  playerActiveIndex: number;
  enemyActiveIndex: number;
  playerHPs: number[];
  enemyHPs: number[];
  playerATB: number;
  enemyATB: number;
  status: 'idle' | 'fighting' | 'victory' | 'defeat';
  log: string[];
  currentEffect: Effect | null;
  effectTicks: number;
  damageNumbers: DamageNumber[];
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  playerSquad,
  enemySquad,
  onBattleEnd
}) => {
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const [state, setState] = useState<BattleState>({
    playerActiveIndex: 0,
    enemyActiveIndex: 0,
    playerHPs: playerSquad.map(u => u.hp),
    enemyHPs: enemySquad.map(u => u.hp),
    playerATB: 0,
    enemyATB: 0,
    status: 'idle',
    log: ['Combat initiated. Ready to engage.'],
    currentEffect: null,
    effectTicks: 0,
    damageNumbers: []
  });

  useEffect(() => {
    if (state.status !== 'fighting') return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.status !== 'fighting') return prev;

        const playerUnit = playerSquad[prev.playerActiveIndex];
        const enemyUnit = enemySquad[prev.enemyActiveIndex];

        if (!playerUnit || !enemyUnit) return prev;

        let nextPlayerATB = prev.playerATB + playerUnit.speed * 0.5;
        let nextEnemyATB = prev.enemyATB + enemyUnit.speed * 0.5;
        
        const nextPlayerHPs = [...prev.playerHPs];
        const nextEnemyHPs = [...prev.enemyHPs];
        const nextLog = [...prev.log];
        let nextPlayerIndex = prev.playerActiveIndex;
        let nextEnemyIndex = prev.enemyActiveIndex;
        let nextEffect = prev.currentEffect;
        let nextEffectTicks = Math.max(0, prev.effectTicks - 1);
        let nextDamageNumbers = prev.damageNumbers.filter(d => Date.now() - d.id < 1000);

        // Effect cleanup: only clear when ticks run out
        if (nextEffectTicks === 0) {
          nextEffect = null;
        }

        // Player attacks
        if (nextPlayerATB >= 100) {
          const damage = calculateDamage(playerUnit.atkType, enemyUnit.defType, playerUnit.atk);
          nextEnemyHPs[nextEnemyIndex] = Math.max(0, nextEnemyHPs[nextEnemyIndex] - damage);
          nextLog.push(`${playerUnit.name} deals ${damage} damage to ${enemyUnit.name}!`);
          nextPlayerATB = 0;
          nextEffect = { type: playerUnit.atkType, source: 'player', id: Date.now() };
          nextEffectTicks = 5; // Stay visible for 5 ticks
          nextDamageNumbers.push({ id: Date.now(), value: damage, source: 'player' });
          if (nextLog.length > 5) nextLog.shift();
        }

        // Enemy attacks
        if (nextEnemyATB >= 100) {
          const damage = calculateDamage(enemyUnit.atkType, playerUnit.defType, enemyUnit.atk);
          nextPlayerHPs[nextPlayerIndex] = Math.max(0, nextPlayerHPs[nextPlayerIndex] - damage);
          nextLog.push(`${enemyUnit.name} deals ${damage} damage to ${playerUnit.name}!`);
          nextEnemyATB = 0;
          nextEffect = { type: enemyUnit.atkType, source: 'enemy', id: Date.now() + 1 };
          nextEffectTicks = 5; // Stay visible for 5 ticks
          nextDamageNumbers.push({ id: Date.now() + 1, value: damage, source: 'enemy' });
          if (nextLog.length > 5) nextLog.shift();
        }

        // Tag-in logic
        if (nextEnemyHPs[nextEnemyIndex] <= 0) {
          nextEnemyIndex++;
          nextEnemyATB = 0;
          nextEffect = null; 
          nextEffectTicks = 0;
          if (nextEnemyIndex < enemySquad.length) {
             nextLog.push(`${enemySquad[nextEnemyIndex].name} enters the battle!`);
          }
        }
        if (nextPlayerHPs[nextPlayerIndex] <= 0) {
          nextPlayerIndex++;
          nextPlayerATB = 0;
          nextEffect = null;
          nextEffectTicks = 0;
          if (nextPlayerIndex < playerSquad.length) {
            nextLog.push(`${playerSquad[nextPlayerIndex].name} enters the battle!`);
          }
        }

        // Win/Loss check
        let nextStatus: BattleState['status'] = prev.status;
        if (nextEnemyIndex >= enemySquad.length) nextStatus = 'victory';
        else if (nextPlayerIndex >= playerSquad.length) nextStatus = 'defeat';

        return {
          ...prev,
          playerActiveIndex: nextPlayerIndex,
          enemyActiveIndex: nextEnemyIndex,
          playerHPs: nextPlayerHPs,
          enemyHPs: nextEnemyHPs,
          playerATB: nextPlayerATB,
          enemyATB: nextEnemyATB,
          status: nextStatus,
          log: nextLog,
          currentEffect: nextEffect,
          effectTicks: nextEffectTicks,
          damageNumbers: nextDamageNumbers
        };
      });
    }, 100 / speedMultiplier);

    return () => clearInterval(interval);
  }, [state.status, playerSquad, enemySquad, speedMultiplier]);

  const handleSkip = () => {
    setState(current => {
      if (current.status !== 'fighting') return current;

      let loopState = {
        ...current,
        playerHPs: [...current.playerHPs],
        enemyHPs: [...current.enemyHPs],
        log: [...current.log]
      };

      while (loopState.status === 'fighting') {
        const playerUnit = playerSquad[loopState.playerActiveIndex];
        const enemyUnit = enemySquad[loopState.enemyActiveIndex];

        if (!playerUnit || !enemyUnit) break;

        let nextPlayerATB = loopState.playerATB + playerUnit.speed * 0.5;
        let nextEnemyATB = loopState.enemyATB + enemyUnit.speed * 0.5;
        
        const nextPlayerHPs = [...loopState.playerHPs];
        const nextEnemyHPs = [...loopState.enemyHPs];
        const nextLog = [...loopState.log];
        let nextPlayerIndex = loopState.playerActiveIndex;
        let nextEnemyIndex = loopState.enemyActiveIndex;

        // Player attacks
        if (nextPlayerATB >= 100) {
          const damage = calculateDamage(playerUnit.atkType, enemyUnit.defType, playerUnit.atk);
          nextEnemyHPs[nextEnemyIndex] = Math.max(0, nextEnemyHPs[nextEnemyIndex] - damage);
          nextLog.push(`${playerUnit.name} deals ${damage} damage to ${enemyUnit.name}!`);
          nextPlayerATB = 0;
          if (nextLog.length > 5) nextLog.shift();
        }

        // Enemy attacks
        if (nextEnemyATB >= 100) {
          const damage = calculateDamage(enemyUnit.atkType, playerUnit.defType, enemyUnit.atk);
          nextPlayerHPs[nextPlayerIndex] = Math.max(0, nextPlayerHPs[nextPlayerIndex] - damage);
          nextLog.push(`${enemyUnit.name} deals ${damage} damage to ${playerUnit.name}!`);
          nextEnemyATB = 0;
          if (nextLog.length > 5) nextLog.shift();
        }

        // Tag-in logic
        if (nextEnemyHPs[nextEnemyIndex] <= 0) {
          nextEnemyIndex++;
          nextEnemyATB = 0;
          if (nextEnemyIndex < enemySquad.length) {
             nextLog.push(`${enemySquad[nextEnemyIndex].name} enters the battle!`);
          }
        }
        if (nextPlayerHPs[nextPlayerIndex] <= 0) {
          nextPlayerIndex++;
          nextPlayerATB = 0;
          if (nextPlayerIndex < playerSquad.length) {
            nextLog.push(`${playerSquad[nextPlayerIndex].name} enters the battle!`);
          }
        }

        // Win/Loss check
        let nextStatus: BattleState['status'] = loopState.status;
        if (nextEnemyIndex >= enemySquad.length) nextStatus = 'victory';
        else if (nextPlayerIndex >= playerSquad.length) nextStatus = 'defeat';

        loopState = {
          ...loopState,
          playerActiveIndex: nextPlayerIndex,
          enemyActiveIndex: nextEnemyIndex,
          playerHPs: nextPlayerHPs,
          enemyHPs: nextEnemyHPs,
          playerATB: nextPlayerATB,
          enemyATB: nextEnemyATB,
          status: nextStatus,
          log: nextLog
        };
      }

      return loopState;
    });
  };

  useEffect(() => {
    if (state.status === 'victory' || state.status === 'defeat') {
      const updatedHPs: Record<string, number> = {};
      playerSquad.forEach((unit, index) => {
        updatedHPs[unit.id] = state.playerHPs[index];
      });
      onBattleEnd(state.status, updatedHPs);
    }
  }, [state.status, onBattleEnd, playerSquad, state.playerHPs]);

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'Thermal': return '🔥';
      case 'Ion': return '⚡';
      case 'Toxic': return '☣️';
      case 'Kinetic': return '☄️';
      case 'Laser': return '🔦';
      case 'Cryo': return '❄️';
      case 'Plating': return '🛡️';
      case 'Shields': return '🌀';
      case 'Bio': return '🌿';
      case 'Ceramic': return '🏺';
      case 'Prism': return '💎';
      case 'NanoFiber': return '🧶';
      default: return '';
    }
  };

  const renderUnit = (unit: Unit, currentHp: number, atb: number, isActive: boolean, isAttacking: boolean, damageNumbers: DamageNumber[]) => {
    if (!unit) return null;
    const hpPercent = Math.max(0, (currentHp / unit.maxHp) * 100);
    const atbPercent = Math.min(100, atb);
    return (
      <div className={`unit-display ${isActive ? 'active' : 'benched'} ${currentHp <= 0 ? 'dead' : ''} ${isAttacking ? 'attacking' : ''}`}>
        <div className="unit-name">{unit.name}</div>
        <div className="unit-type-header">
          {getTypeIcon(unit.atkType)} / {getTypeIcon(unit.defType)}
        </div>
        <div className="unit-hp-bar">
          <div className="unit-hp-fill" style={{ width: `${hpPercent}%` }}></div>
        </div>
        {isActive && (
          <div className="unit-atb-bar">
            <div className="unit-atb-fill" style={{ width: `${atbPercent}%` }}></div>
          </div>
        )}
        <div className="damage-container">
          {damageNumbers.map(d => (
            <div key={d.id} className="damage-number">-{d.value}</div>
          ))}
        </div>
      </div>
    );
  };

  const renderBench = (squad: Unit[], hps: number[], activeIndex: number, side: 'player' | 'enemy') => {
    const benchedUnits = squad.slice(activeIndex + 1);
    const benchedHPs = hps.slice(activeIndex + 1);

    if (benchedUnits.length === 0) return <div className="bench empty">NO REINFORCEMENTS</div>;

    return (
      <div className={`bench-list ${side}`}>
        <div className="bench-title">NEXT IN LINE</div>
        {benchedUnits.map((u, i) => {
          const hpPercent = (benchedHPs[i] / u.maxHp) * 100;
          return (
            <div key={u.id} className={`bench-card ${benchedHPs[i] <= 0 ? 'dead' : ''}`}>
              <div className="bench-card-header">
                <span className="bench-name">{u.name}</span>
                <span className="bench-types">{getTypeIcon(u.atkType)}/{getTypeIcon(u.defType)}</span>
              </div>
              <div className="bench-hp-bar">
                <div className="bench-hp-fill" style={{ width: `${hpPercent}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const activePlayer = playerSquad[state.playerActiveIndex];
  const activeEnemy = enemySquad[state.enemyActiveIndex];

  return (
    <div className="battle-arena">
      <div className="speed-controls">
        <button 
          className={`speed-btn ${speedMultiplier === 1 ? 'active' : ''}`} 
          onClick={() => setSpeedMultiplier(1)}
        >
          1x
        </button>
        <button 
          className={`speed-btn ${speedMultiplier === 2 ? 'active' : ''}`} 
          onClick={() => setSpeedMultiplier(2)}
        >
          2x
        </button>
        <button 
          className={`speed-btn ${speedMultiplier === 4 ? 'active' : ''}`} 
          onClick={() => setSpeedMultiplier(4)}
        >
          4x
        </button>
        {state.status === 'fighting' && (
          <button className="speed-btn skip-btn" onClick={handleSkip}>
            SKIP
          </button>
        )}
      </div>
      <div className="status-header">
        {state.status === 'idle' && (
          <button className="start-btn" onClick={() => setState(p => ({ ...p, status: 'fighting' }))}>
            START BATTLE
          </button>
        )}
        {state.status === 'fighting' && <div className="fighting-label">ENGAGED</div>}
        {state.status === 'victory' && <div className="victory-label">VICTORY</div>}
        {state.status === 'defeat' && <div className="defeat-label">DEFEAT</div>}
      </div>

      <div className="duel-zone">
        <div className="side player-side">
          {activePlayer && renderUnit(
            activePlayer, 
            state.playerHPs[state.playerActiveIndex], 
            state.playerATB, 
            true,
            state.currentEffect?.source === 'player',
            state.damageNumbers.filter(d => d.source === 'enemy')
          )}
          {renderBench(playerSquad, state.playerHPs, state.playerActiveIndex, 'player')}
        </div>

        <div className="vs-divider">
          VS
          {state.currentEffect && (
            <div key={state.currentEffect.id} className={`battle-effect ${state.currentEffect.type.toLowerCase()} ${state.currentEffect.source}`}>
              {state.currentEffect.type === 'Thermal' && <div className="fire-beam"></div>}
              {state.currentEffect.type === 'Ion' && <div className="lightning-bolt"></div>}
              {state.currentEffect.type === 'Toxic' && <div className="toxic-glob"></div>}
              {state.currentEffect.type === 'Kinetic' && <div className="kinetic-slug"></div>}
              {state.currentEffect.type === 'Laser' && <div className="laser-beam"></div>}
              {state.currentEffect.type === 'Cryo' && <div className="cryo-blast"></div>}
            </div>
          )}
        </div>

        <div className="side enemy-side">
          {activeEnemy && renderUnit(
            activeEnemy, 
            state.enemyHPs[state.enemyActiveIndex], 
            state.enemyATB, 
            true,
            state.currentEffect?.source === 'enemy',
            state.damageNumbers.filter(d => d.source === 'player')
          )}
          {renderBench(enemySquad, state.enemyHPs, state.enemyActiveIndex, 'enemy')}
        </div>
      </div>

      <div className="combat-log">
        {state.log.map((entry, i) => (
          <div key={i} className="log-entry">{entry}</div>
        ))}
      </div>
    </div>
  );
};
