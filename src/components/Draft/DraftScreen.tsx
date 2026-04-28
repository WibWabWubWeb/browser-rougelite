import React, { useState } from 'react';
import type { Unit, AttackType, ArmorType } from '../../types/game';
import { AttackType as AT, ArmorType as ART } from '../../types/game';
import './DraftScreen.css';

interface DraftScreenProps {
  onSelect: (squad: Unit[]) => void;
}

const ATK_POOL: AttackType[] = Object.values(AT);
const DEF_POOL: ArmorType[] = Object.values(ART);

const generateRandomUnit = (id: string): Unit => {
  const atkType = ATK_POOL[Math.floor(Math.random() * ATK_POOL.length)];
  const defType = DEF_POOL[Math.floor(Math.random() * DEF_POOL.length)];
  const names = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];
  const name = `${names[Math.floor(Math.random() * names.length)]} Squadron`;
  
  return {
    id,
    name,
    atkType,
    defType,
    hp: 40 + Math.floor(Math.random() * 20),
    maxHp: 60,
    atk: 8 + Math.floor(Math.random() * 5),
    speed: 5 + Math.floor(Math.random() * 10),
    level: 1,
    xp: 0,
    xpToNext: 100,
    milestones: [],
  };
};

const generateSquad = (offset: number): Unit[] => {
  return [
    generateRandomUnit(`u-${offset}-1`),
    generateRandomUnit(`u-${offset}-2`),
    generateRandomUnit(`u-${offset}-3`),
  ];
};

export const DraftScreen: React.FC<DraftScreenProps> = ({ onSelect }) => {
  const [squads] = useState(() => [
    generateSquad(0),
    generateSquad(1),
    generateSquad(2),
  ]);

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
    <div className="draft-screen">
      <header className="draft-header">
        <h1>Initial Deployment</h1>
        <p>Select your starting squad for the mission.</p>
      </header>
      
      <div className="squad-options">
        {squads.map((squad, idx) => (
          <div key={idx} className="squad-card">
            <h3>Squad {idx + 1}</h3>
            <div className="unit-list">
              {squad.map(unit => (
                <div key={unit.id} className="unit-info-compact" title={`HP: ${unit.hp}, ATK: ${unit.atk}, SPD: ${unit.speed}`}>
                  <div className="unit-icon">
                    {getTypeIcon(unit.atkType)}
                    <span className="type-sep">/</span>
                    {getTypeIcon(unit.defType)}
                  </div>
                  <div className="unit-details">
                    <span className="unit-name">{unit.name}</span>
                    <span className="unit-type">{unit.atkType} / {unit.defType}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="select-button" onClick={() => onSelect(squad)}>
              Select Squad
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
