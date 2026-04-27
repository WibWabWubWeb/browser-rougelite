import React, { useState, useEffect } from 'react';
import './BattleArena.css';
import type { Unit } from '../../types/game';
import { calculateDamage } from '../../logic/combat';

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
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  playerSquad,
  enemySquad,
  onBattleEnd
}) => {
  const [state, setState] = useState<BattleState>({
    playerActiveIndex: 0,
    enemyActiveIndex: 0,
    playerHPs: playerSquad.map(u => u.hp),
    enemyHPs: enemySquad.map(u => u.hp),
    playerATB: 0,
    enemyATB: 0,
    status: 'idle',
    log: ['Combat initiated. Ready to engage.']
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
        
        let nextPlayerHPs = [...prev.playerHPs];
        let nextEnemyHPs = [...prev.enemyHPs];
        let nextLog = [...prev.log];
        let nextPlayerIndex = prev.playerActiveIndex;
        let nextEnemyIndex = prev.enemyActiveIndex;

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
          log: nextLog
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [state.status, playerSquad, enemySquad]);

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
      case 'Plating': return '🛡️';
      case 'Shields': return '🌀';
      case 'Bio': return '🌿';
      default: return '';
    }
  };

  const renderUnit = (unit: Unit, currentHp: number, atb: number, isActive: boolean) => {
    if (!unit) return null;
    const hpPercent = Math.max(0, (currentHp / unit.maxHp) * 100);
    const atbPercent = Math.min(100, atb);
    return (
      <div className={`unit-display ${isActive ? 'active' : 'benched'} ${currentHp <= 0 ? 'dead' : ''}`}>
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
      </div>
    );
  };

  const activePlayer = playerSquad[state.playerActiveIndex];
  const activeEnemy = enemySquad[state.enemyActiveIndex];

  return (
    <div className="battle-arena">
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
          {activePlayer && renderUnit(activePlayer, state.playerHPs[state.playerActiveIndex], state.playerATB, true)}
          <div className="bench">
            {playerSquad.map((u, i) => i !== state.playerActiveIndex && (
              <div key={u.id} className={`bench-pip ${state.playerHPs[i] <= 0 ? 'dead' : ''}`} title={u.name}></div>
            ))}
          </div>
        </div>

        <div className="vs-divider">VS</div>

        <div className="side enemy-side">
          {activeEnemy && renderUnit(activeEnemy, state.enemyHPs[state.enemyActiveIndex], state.enemyATB, true)}
          <div className="bench">
            {enemySquad.map((u, i) => i !== state.enemyActiveIndex && (
              <div key={u.id} className={`bench-pip ${state.enemyHPs[i] <= 0 ? 'dead' : ''}`} title={u.name}></div>
            ))}
          </div>
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
