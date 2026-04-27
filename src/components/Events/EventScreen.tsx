import React, { useState } from 'react';
import { GameEvent, EventOutcome } from '../../types/game';
import './EventScreen.css';

interface EventScreenProps {
  event: GameEvent;
  onResolve: (outcome: EventOutcome) => void;
}

export const EventScreen: React.FC<EventScreenProps> = ({ event, onResolve }) => {
  const [selectedOutcome, setSelectedOutcome] = useState<EventOutcome | null>(null);

  const handleChoice = (outcome: EventOutcome) => {
    setSelectedOutcome(outcome);
  };

  if (selectedOutcome) {
    return (
      <div className="event-screen-overlay">
        <div className="event-content result">
          <h2>Result</h2>
          <p className="outcome-text">{selectedOutcome.text}</p>
          <button className="nav-button" onClick={() => onResolve(selectedOutcome)}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-screen-overlay">
      <div className="event-content">
        <h1 className="event-title">{event.title}</h1>
        <p className="event-prompt">{event.prompt}</p>
        
        <div className="choices-container">
          {event.choices.map((choice) => (
            <div 
              key={choice.id} 
              className="choice-card"
              onClick={() => handleChoice(choice.outcomes[0])}
            >
              <h3>{choice.label}</h3>
              <p>{choice.description}</p>
              <div className="outcome-preview">
                {choice.outcomes.map(o => o.text).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
