import React from 'react';
import './GameOver.css';

interface GameOverProps {
  onRestart: () => void;
  depth: number;
}

export const GameOver: React.FC<GameOverProps> = ({ onRestart, depth }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h1 className="game-over-title">SQUAD NEUTRALIZED</h1>
        <p className="game-over-msg">All units are offline. Mission failed.</p>
        
        <div className="game-over-stats">
          <div className="stat-row">
            <span>SECTOR DEPTH REACHED:</span>
            <span className="stat-value">{depth}</span>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart}>
          INITIATE NEW DEPLOYMENT
        </button>
      </div>
    </div>
  );
};
