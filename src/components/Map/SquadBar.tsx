import React from 'react';
import type { Unit } from '../../types/game';
import './SquadBar.css';

interface SquadBarProps {
  squad: Unit[];
  onReorder: (newSquad: Unit[]) => void;
}

export const SquadBar: React.FC<SquadBarProps> = ({ squad, onReorder }) => {
  const [localSquad, setLocalSquad] = React.useState<Unit[]>(squad);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  // Keep local squad in sync with props when not dragging
  React.useEffect(() => {
    if (draggedIndex === null) {
      setLocalSquad(squad);
    }
  }, [squad, draggedIndex]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSquad = [...localSquad];
    const draggedItem = newSquad[draggedIndex];
    newSquad.splice(draggedIndex, 1);
    newSquad.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setLocalSquad(newSquad);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null) {
      onReorder(localSquad);
    }
    setDraggedIndex(null);
  };

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

  return (
    <div className="squad-bar">
      <div className="squad-bar-header">COMBAT ORDER (DRAG TO REORDER)</div>
      <div className="squad-units">
        {Array.from({ length: 6 }).map((_, index) => {
          const unit = localSquad[index];
          if (unit) {
            const hpPercent = (unit.hp / unit.maxHp) * 100;
            return (
              <div
                key={unit.id}
                className={`squad-unit-card ${draggedIndex === index ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => e.preventDefault()}
              >
                <div className="unit-rank">{index + 1}</div>
                <div className="unit-type-icons">
                  <span title={`ATK: ${unit.atkType}`}>{getTypeIcon(unit.atkType)}</span>
                  <span className="type-divider">/</span>
                  <span title={`DEF: ${unit.defType}`}>{getTypeIcon(unit.defType)}</span>
                </div>
                <div className="unit-info">
                  <div className="unit-name">{unit.name}</div>
                  <div className="unit-stats">SPD {unit.speed} | ATK {unit.atk}</div>
                  <div className="unit-hp-bar">
                    <div className="unit-hp-fill" style={{ width: `${hpPercent}%` }}></div>
                  </div>
                  <div className="unit-hp-text">{unit.hp}/{unit.maxHp} HP</div>
                </div>
              </div>
            );
          }
          return (
            <div key={`empty-${index}`} className="empty-slot">
              <div className="unit-rank">{index + 1}</div>
              <div className="empty-slot-label">EMPTY</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
