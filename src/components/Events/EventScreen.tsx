import React, { useState } from 'react';
import type { GameEvent, EventOutcome, Unit, EventChoice } from '../../types/game';
import { TargetSelectionModal } from '../Shared/TargetSelectionModal';
import './EventScreen.css';

interface EventScreenProps {
  event: GameEvent;
  squad: Unit[];
  onResolve: (outcome: EventOutcome, targetUnitId?: string) => void;
  recruit: (unit: Unit, cost: number, index?: number) => void;
  removeUnit: (unitId: string) => void;
}

export const EventScreen: React.FC<EventScreenProps> = ({ 
  event, 
  squad, 
  onResolve,
  recruit,
  removeUnit
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<EventOutcome | null>(null);
  const [pendingChoice, setPendingChoice] = useState<EventChoice | null>(null);
  const [resolverUnitId, setResolverUnitId] = useState<string | undefined>(undefined);
  const [isReplacing, setIsReplacing] = useState(false);

  const calculateOutcome = (choice: EventChoice, unit?: Unit): EventOutcome => {
    if (unit && choice.unitRequirements) {
      const req = choice.unitRequirements.find(r => 
        (r.atkType && unit.atkType === r.atkType) || 
        (r.defType && unit.defType === r.defType)
      );

      if (req) {
        if (req.outcomeOverride) {
          return req.outcomeOverride;
        }
        if (req.chanceOverride !== undefined) {
          const roll = Math.random();
          if (roll < req.chanceOverride) {
            return choice.outcomes.find(o => (o.hp || 0) >= 0 && (o.xp || 0) >= 0) || choice.outcomes[0];
          } else {
            return choice.outcomes.find(o => (o.hp || 0) < 0) || choice.outcomes[choice.outcomes.length - 1];
          }
        }
      }
    }

    if (choice.outcomes.length > 1) {
      const roll = Math.random();
      let cumulative = 0;
      for (const o of choice.outcomes) {
        const chance = o.chance ?? (1 / choice.outcomes.length);
        cumulative += chance;
        if (roll <= cumulative) {
          return o;
        }
      }
      return choice.outcomes[choice.outcomes.length - 1];
    }

    return choice.outcomes[0];
  };

  const handleChoice = (choice: EventChoice) => {
    if (choice.requiresUnitSelection) {
      setPendingChoice(choice);
    } else {
      const outcome = calculateOutcome(choice);
      setSelectedOutcome(outcome);
    }
  };

  const handleUnitSelect = (unit: Unit) => {
    if (pendingChoice) {
      const outcome = calculateOutcome(pendingChoice, unit);
      setResolverUnitId(unit.id);
      setSelectedOutcome(outcome);
      setPendingChoice(null);
    }
  };

  const handleFinalize = () => {
    if (!selectedOutcome) return;

    if (selectedOutcome.newUnit) {
      if (squad.length < 6) {
        recruit(selectedOutcome.newUnit, 0);
        onResolve(selectedOutcome, resolverUnitId);
      } else {
        setIsReplacing(true);
      }
    } else {
      onResolve(selectedOutcome, resolverUnitId);
    }
  };

  const handleReplace = (unitId: string, index: number) => {
    if (selectedOutcome?.newUnit) {
      recruit(selectedOutcome.newUnit, 0, index);
      onResolve(selectedOutcome, resolverUnitId);
    }
    setIsReplacing(false);
  };

  const handleDiscardNewUnit = () => {
    if (selectedOutcome) {
      onResolve(selectedOutcome, resolverUnitId);
    }
    setIsReplacing(false);
  };

  if (selectedOutcome) {
    return (
      <div className="event-screen-overlay">
        <div className="event-content result animate-fade-in">
          <h2>Result</h2>
          <p className="outcome-text">{selectedOutcome.text}</p>
          <div className="outcome-rewards">
            {selectedOutcome.credits && <span className="reward credits">+{selectedOutcome.credits} Credits</span>}
            {selectedOutcome.xp && <span className="reward xp">+{selectedOutcome.xp} XP</span>}
            {selectedOutcome.hp && <span className={`reward hp ${selectedOutcome.hp < 0 ? 'negative' : ''}`}>{selectedOutcome.hp}% HP</span>}
            {selectedOutcome.newUnit && <span className="reward unit">New Unit: {selectedOutcome.newUnit.name}</span>}
            {selectedOutcome.removeUnit && <span className="reward death">Unit Lost</span>}
          </div>
          <button className="nav-button primary" onClick={handleFinalize}>
            Continue
          </button>
        </div>

        {isReplacing && (
          <TargetSelectionModal
            title="Your squad is full. Choose a unit to replace, or discard the new one."
            squad={squad}
            onSelect={handleReplace}
            onCancel={handleDiscardNewUnit}
          />
        )}
      </div>
    );
  }

  if (pendingChoice) {
    return (
      <div className="event-screen-overlay">
        <div className="event-content unit-selection">
          <h2>Select a Specialist</h2>
          <p className="selection-prompt">Who will attempt to: <strong>{pendingChoice.label}</strong>?</p>
          
          <div className="unit-selection-grid">
            {squad.map(unit => (
              <div key={unit.id} className="unit-card-compact selectable" onClick={() => handleUnitSelect(unit)}>
                <div className="unit-header">
                  <span className="unit-name">{unit.name}</span>
                  <span className="unit-level">Lv.{unit.level}</span>
                </div>
                <div className="unit-types">
                  <span className={`type-pilla ${unit.atkType.toLowerCase()}`}>{unit.atkType}</span>
                  <span className={`type-pilla ${unit.defType.toLowerCase()}`}>{unit.defType}</span>
                </div>
                <div className="unit-hp-bar">
                  <div className="hp-fill" style={{ width: `${(unit.hp / unit.maxHp) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="nav-button secondary" onClick={() => setPendingChoice(null)}>
            Back to Choices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-screen-overlay">
      <div className="event-content animate-fade-in">
        <h1 className="event-title">{event.title}</h1>
        <p className="event-prompt">{event.prompt}</p>
        
        <div className="choices-container">
          {event.choices.map((choice) => (
            <div 
              key={choice.id} 
              className="choice-card clickable"
              onClick={() => handleChoice(choice)}
            >
              <div className="choice-header">
                <h3>{choice.label}</h3>
                {choice.requiresUnitSelection && <span className="specialist-badge">Requires Unit</span>}
              </div>
              <p className="choice-desc">{choice.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
