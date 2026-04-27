import React from 'react';
import type { Unit } from '../../types/game';
import './SquadBar.css';

interface SquadBarProps {
  squad: Unit[];
  onReorder: (newSquad: Unit[]) => void;
}

export const SquadBar: React.FC<SquadBarProps> = ({ squad, onReorder }) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSquad = [...squad];
    const draggedItem = newSquad[draggedIndex];
    newSquad.splice(draggedIndex, 1);
    newSquad.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    onReorder(newSquad);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const getIntelIcon = (type?: string) => {
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
        {squad.map((unit, index) => (
          <div
            key={unit.id}
            className={`squad-unit-card ${draggedIndex === index ? 'dragging' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="unit-rank">{index + 1}</div>
            <div className="unit-type-icon">{getIntelIcon(unit.type)}</div>
            <div className="unit-info">
              <div className="unit-name">{unit.name}</div>
              <div className="unit-stats">SPD {unit.speed} | ATK {unit.atk}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
