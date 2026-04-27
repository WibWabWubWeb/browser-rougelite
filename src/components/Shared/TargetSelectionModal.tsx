import './TargetSelectionModal.css';
import type { Unit } from '../../types/game';

interface TargetSelectionModalProps {
  title: string;
  squad: Unit[];
  onSelect: (unitId: string, index: number) => void;
  onCancel: () => void;
}

export function TargetSelectionModal({ title, squad, onSelect, onCancel }: TargetSelectionModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="squad-list">
          {squad.map((unit, index) => (
            <div
              key={unit.id}
              className="unit-card"
              onClick={() => onSelect(unit.id, index)}
            >
              <div className="unit-name">{unit.name}</div>
              <div className="unit-hp">{unit.hp} / {unit.maxHp} HP</div>
              <div className="unit-types">
                <span className={`type-badge atk-${unit.atkType.toLowerCase()}`}>
                  {unit.atkType}
                </span>
                <span className={`type-badge def-${unit.defType.toLowerCase()}`}>
                  {unit.defType}
                </span>
              </div>
              <div className="unit-stats">
                <span>ATK: {unit.atk}</span>
                <span>SPD: {unit.speed}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
