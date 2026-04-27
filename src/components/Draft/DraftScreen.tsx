import React, { useState } from 'react';
import type { Unit, UnitType } from '../../types/game';
import { UnitType as UT } from '../../types/game';
import './DraftScreen.css';

interface DraftScreenProps {
  onSelect: (squad: Unit[]) => void;
}

const UNIT_POOL: UnitType[] = Object.values(UT);

const generateRandomUnit = (id: string): Unit => {
  const type = UNIT_POOL[Math.floor(Math.random() * UNIT_POOL.length)];
  const names = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];
  const name = `${type} ${names[Math.floor(Math.random() * names.length)]}`;
  
  return {
    id,
    name,
    type,
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
                  <div className="unit-icon">{unit.type.substring(0, 1)}</div>
                  <div className="unit-details">
                    <span className="unit-name">{unit.name}</span>
                    <span className="unit-type">{unit.type}</span>
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
