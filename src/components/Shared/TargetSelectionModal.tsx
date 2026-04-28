import { useState } from 'react';
import './TargetSelectionModal.css';
import type { Unit } from '../../types/game';

interface TargetSelectionModalProps {
  title: string;
  squad: Unit[];
  onSelect: (unitId: string, index: number) => void;
  onCancel: () => void;
}

export function TargetSelectionModal({ title, squad, onSelect, onCancel }: TargetSelectionModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      onSelect(squad[selectedIndex].id, selectedIndex);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="squad-list">
          {squad.map((unit, index) => (
            <div
              key={unit.id}
              className={`unit-card ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="unit-name">
                {unit.name}
                <div className="unit-lv">LV.{unit.level}</div>
              </div>
              <div className="unit-hp">{unit.hp} / {unit.maxHp} HP</div>
              <div className="unit-types">
                <span className={`type-badge atk-${unit.atkType.toLowerCase()}`}>
                  {unit.atkType}
                </span>
                <span className={`type-badge def-${unit.defType.toLowerCase()}`}>
                  {unit.defType}
                </span>
              </div>
              <div className="unit-progress">
                <div className="progress-bar hp">
                  <div className="fill" style={{ width: `${(unit.hp / unit.maxHp) * 100}%` }}></div>
                </div>
                <div className="progress-bar xp">
                  <div className="fill" style={{ width: `${(unit.xp / unit.xpToNext) * 100}%` }}></div>
                </div>
              </div>
              <div className="unit-stats">
                <span>ATK: {unit.atk}</span>
                <span>SPD: {unit.speed}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button 
            className="confirm-button" 
            onClick={handleConfirm}
            disabled={selectedIndex === null}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
