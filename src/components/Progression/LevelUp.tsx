import React, { useState } from 'react';
import type { Unit } from '../../types/game';
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
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleStatSelect = (unitId: string, stat: 'atk' | 'hp') => {
    setSelections(prev => ({ ...prev, [unitId]: stat }));
    onSelectStat(unitId, stat);
  };

  const handleMilestoneSelect = (unitId: string, milestone: string) => {
    setSelections(prev => ({ ...prev, [unitId]: milestone }));
    onSelectMilestone(unitId, milestone);
  };

  const allSelected = leveledUnits.every(unit => selections[unit.id]);

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

  return (
    <div className="level-up-overlay">
      <div className="level-up-container">
        <h1>Level Up!</h1>
        <div className="units-grid">
          {leveledUnits.map(unit => {
            const isMilestoneLevel = unit.level === 3 || unit.level === 6;
            const selection = selections[unit.id];

            return (
              <div key={unit.id} className="unit-card">
                <div className="unit-header">
                  <h2>{unit.name}</h2>
                  <span className="unit-type">
                    {getTypeIcon(unit.atkType)} / {getTypeIcon(unit.defType)}
                  </span>
                </div>
                <p className="level-text">New Level: {unit.level}</p>
                <div className="unit-xp-bar">
                  <div className="unit-xp-fill" style={{ width: `${(unit.xp / unit.xpToNext) * 100}%` }}></div>
                </div>
                <div className="unit-stats">
                  <div>ATK: {unit.atk}</div>
                  <div>HP: {unit.hp}/{unit.maxHp}</div>
                </div>

                <div className="rewards-section">
                  <h3>Choose Reward:</h3>
                  {!isMilestoneLevel ? (
                    <div className="choice-buttons">
                      <button 
                        className={`choice-button ${selection === 'atk' ? 'selected' : ''}`}
                        onClick={() => handleStatSelect(unit.id, 'atk')}
                      >
                        Increase Firepower
                        <span className="choice-detail">+5 ATK</span>
                      </button>
                      <button 
                        className={`choice-button ${selection === 'hp' ? 'selected' : ''}`}
                        onClick={() => handleStatSelect(unit.id, 'hp')}
                      >
                        Reinforce Hull
                        <span className="choice-detail">+10 Max HP & Heal</span>
                      </button>
                    </div>
                  ) : (
                    <div className="choice-buttons">
                      <button 
                        className={`choice-button ${selection === 'Heavy Shielding' ? 'selected' : ''}`}
                        onClick={() => handleMilestoneSelect(unit.id, 'Heavy Shielding')}
                      >
                        Heavy Shielding
                        <span className="choice-detail">Milestone Ability</span>
                      </button>
                      <button 
                        className={`choice-button ${selection === 'Rapid Fire' ? 'selected' : ''}`}
                        onClick={() => handleMilestoneSelect(unit.id, 'Rapid Fire')}
                      >
                        Rapid Fire
                        <span className="choice-detail">Milestone Ability</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button 
          className="confirm-button" 
          onClick={onConfirm}
          disabled={!allSelected}
        >
          Confirm and Continue
        </button>
      </div>
    </div>
  );
};
