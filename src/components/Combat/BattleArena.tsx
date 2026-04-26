import React from 'react';
import './BattleArena.css';
import { Unit } from '../../types/game';

interface BattleArenaProps {
  playerSquad: Unit[];
  enemySquad: Unit[];
  onBattleEnd: (result: 'victory' | 'defeat') => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  playerSquad,
  enemySquad,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBattleEnd
}) => {
  return (
    <div className="battle-arena">
      <div className="arena-hubs">
        <div className="hub player-hub">
          <span>PLAYER HUB</span>
          <div className="hub-hp-bar"><div className="hub-hp-fill" style={{ width: '100%' }}></div></div>
        </div>
        <div className="status-display">
          <button className="start-btn">START BATTLE</button>
        </div>
        <div className="hub enemy-hub">
          <span>ENEMY HUB</span>
          <div className="hub-hp-bar"><div className="hub-hp-fill" style={{ width: '100%' }}></div></div>
        </div>
      </div>
      <div className="lanes">
        {[0, 1, 2].map(i => (
          <div key={i} className="lane">
            <div className="unit-card">{playerSquad[i]?.name || 'Empty'}</div>
            <div className="lane-divider">vs</div>
            <div className="unit-card">{enemySquad[i]?.name || 'Empty'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
