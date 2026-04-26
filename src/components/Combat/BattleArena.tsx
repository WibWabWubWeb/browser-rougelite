import React, { useState, useEffect } from 'react';
import './BattleArena.css';
import { Unit, UnitType } from '../../types/game';
import { calculateDamage } from '../../logic/combat';

interface BattleArenaProps {
  playerSquad: Unit[];
  enemySquad: Unit[];
  onBattleEnd: (result: 'victory' | 'defeat') => void;
}

interface BattleState {
  playerHPs: number[];
  enemyHPs: number[];
  hubHPs: { player: number; enemy: number };
  status: 'idle' | 'fighting' | 'victory' | 'defeat';
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  playerSquad,
  enemySquad,
  onBattleEnd
}) => {
  const [state, setState] = useState<BattleState>({
    playerHPs: playerSquad.map(u => u.hp),
    enemyHPs: enemySquad.map(u => u.hp),
    hubHPs: { player: 100, enemy: 100 },
    status: 'idle'
  });

  useEffect(() => {
    if (state.status !== 'fighting') return;

    const interval = setInterval(() => {
      setState(prev => {
        const nextPlayerHPs = [...prev.playerHPs];
        const nextEnemyHPs = [...prev.enemyHPs];
        let nextHubPlayer = prev.hubHPs.player;
        let nextHubEnemy = prev.hubHPs.enemy;

        for (let i = 0; i < 3; i++) {
          // Player attacks
          if (nextPlayerHPs[i] > 0) {
            const attacker = playerSquad[i];
            if (nextEnemyHPs[i] > 0) {
              const damage = calculateDamage(attacker.type, enemySquad[i].type, attacker.atk);
              nextEnemyHPs[i] = Math.max(0, nextEnemyHPs[i] - damage);
            } else {
              // Plating is a good neutral-ish type for Hubs in our Star Cycle
              const damage = calculateDamage(attacker.type, UnitType.Plating, attacker.atk);
              nextHubEnemy = Math.max(0, nextHubEnemy - damage);
            }
          }

          // Enemy attacks
          if (nextEnemyHPs[i] > 0) {
            const attacker = enemySquad[i];
            if (nextPlayerHPs[i] > 0) {
              const damage = calculateDamage(attacker.type, playerSquad[i].type, attacker.atk);
              nextPlayerHPs[i] = Math.max(0, nextPlayerHPs[i] - damage);
            } else {
              const damage = calculateDamage(attacker.type, UnitType.Plating, attacker.atk);
              nextHubPlayer = Math.max(0, nextHubPlayer - damage);
            }
          }
        }

        let nextStatus = prev.status;
        if (nextHubEnemy <= 0) nextStatus = 'victory';
        else if (nextHubPlayer <= 0) nextStatus = 'defeat';

        return {
          playerHPs: nextPlayerHPs,
          enemyHPs: nextEnemyHPs,
          hubHPs: { player: nextHubPlayer, enemy: nextHubEnemy },
          status: nextStatus
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, playerSquad, enemySquad]);

  useEffect(() => {
    if (state.status === 'victory' || state.status === 'defeat') {
      onBattleEnd(state.status);
    }
  }, [state.status, onBattleEnd]);

  const renderUnit = (unit: Unit, currentHp: number) => {
    if (!unit) return <div className="unit-card empty">Empty</div>;
    const hpPercent = Math.max(0, (currentHp / unit.maxHp) * 100);
    return (
      <div className={`unit-card ${currentHp <= 0 ? 'dead' : ''}`}>
        <div className="unit-name">{unit.name}</div>
        <div className="unit-type" style={{ fontSize: '0.8em', color: '#888' }}>{unit.type}</div>
        <div className="unit-hp-bar">
          <div className="unit-hp-fill" style={{ width: `${hpPercent}%`, background: hpPercent < 30 ? '#ff4444' : '#00ff00' }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="battle-arena">
      <div className="arena-hubs">
        <div className="hub player-hub">
          <span>PLAYER HUB</span>
          <div className="hub-hp-bar">
            <div className="hub-hp-fill" style={{ width: `${state.hubHPs.player}%` }}></div>
          </div>
        </div>
        <div className="status-display">
          {state.status === 'idle' && (
            <button className="start-btn" onClick={() => setState(p => ({ ...p, status: 'fighting' }))}>
              START BATTLE
            </button>
          )}
          {state.status === 'fighting' && <div className="fighting-label">ENGAGED</div>}
          {state.status === 'victory' && <div className="victory-label" style={{ color: '#00ff00' }}>VICTORY</div>}
          {state.status === 'defeat' && <div className="defeat-label" style={{ color: '#ff0000' }}>DEFEAT</div>}
        </div>
        <div className="hub enemy-hub">
          <span>ENEMY HUB</span>
          <div className="hub-hp-bar">
            <div className="hub-hp-fill" style={{ width: `${state.hubHPs.enemy}%` }}></div>
          </div>
        </div>
      </div>
      <div className="lanes">
        {[0, 1, 2].map(i => (
          <div key={i} className="lane">
            {renderUnit(playerSquad[i], state.playerHPs[i])}
            <div className="lane-divider">VS</div>
            {renderUnit(enemySquad[i], state.enemyHPs[i])}
          </div>
        ))}
      </div>
    </div>
  );
};
