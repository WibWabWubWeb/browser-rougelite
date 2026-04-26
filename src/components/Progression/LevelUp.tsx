import React from 'react';
import { Unit } from '../../types/game';
import './LevelUp.css';

interface LevelUpProps {
  leveledUnits: Unit[];
  onSelectStat: (unitId: string, stat: 'atk' | 'hp') => void;
  onSelectMilestone: (unitId: string, milestone: string) => void;
  onConfirm: () => void;
}

export const LevelUp: React.FC<LevelUpProps> = ({
  leveledUnits,
  onSelectStat,
  onSelectMilestone,
  onConfirm,
}) => {
  return (
    <div className="level-up-overlay">
      <div className="level-up-container">
        <h1>Level Up!</h1>
        <div className="units-grid">
          {leveledUnits.map(unit => (
            <div key={unit.id} className="unit-card">
              <div className="unit-header">
                <h2>{unit.name}</h2>
                <span className="unit-type">{unit.type}</span>
              </div>
              <p className="level-text">New Level: {unit.level}</p>
              <div className="unit-stats">
                <div>ATK: {unit.atk}</div>
                <div>HP: {unit.hp}/{unit.maxHp}</div>
              </div>
              {/* Rewards will go here */}
            </div>
          ))}
        </div>
        <button className="confirm-button" onClick={onConfirm}>
          Confirm and Continue
        </button>
      </div>
    </div>
  );
};
