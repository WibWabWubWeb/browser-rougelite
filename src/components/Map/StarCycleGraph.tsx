import React from 'react';
import './StarCycleGraph.css';

const UNIT_TYPES = [
  { type: 'Thermal', icon: '🔥', angle: 0 },
  { type: 'Plating', icon: '🛡️', angle: 60 },
  { type: 'Bio', icon: '🌿', angle: 120 },
  { type: 'Ion', icon: '⚡', angle: 180 },
  { type: 'Shields', icon: '🌀', angle: 240 },
  { type: 'Toxic', icon: '☣️', angle: 300 },
];

const RADIUS = 120;
const CENTER = 150;

const getCoords = (angle: number, radius: number) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
};

export const StarCycleGraph: React.FC = () => {
  return (
    <div className="star-cycle-container">
      <h3>Star Cycle</h3>
      <svg viewBox="0 0 300 300" className="star-cycle-svg">
        <defs>
          <marker id="arrowhead-strong" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4caf50" />
          </marker>
          <marker id="arrowhead-weak" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f44336" />
          </marker>
        </defs>
        
        {/* Strong Relationships (Green) */}
        <line x1={getCoords(0, 100).x} y1={getCoords(0, 100).y} x2={getCoords(60, 100).x} y2={getCoords(60, 100).y} stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead-strong)" />
        <line x1={getCoords(0, 100).x} y1={getCoords(0, 100).y} x2={getCoords(120, 100).x} y2={getCoords(120, 100).y} stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead-strong)" />
        <line x1={getCoords(180, 100).x} y1={getCoords(180, 100).y} x2={getCoords(240, 100).x} y2={getCoords(240, 100).y} stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead-strong)" />
        <line x1={getCoords(300, 100).x} y1={getCoords(300, 100).y} x2={getCoords(120, 100).x} y2={getCoords(120, 100).y} stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead-strong)" />

        {/* Weak Relationships (Red) */}
        <line x1={getCoords(0, 80).x} y1={getCoords(0, 80).y} x2={getCoords(240, 80).x} y2={getCoords(240, 80).y} stroke="#f44336" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-weak)" />
        <line x1={getCoords(180, 80).x} y1={getCoords(180, 80).y} x2={getCoords(60, 80).x} y2={getCoords(60, 80).y} stroke="#f44336" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-weak)" />
        <line x1={getCoords(300, 80).x} y1={getCoords(300, 80).y} x2={getCoords(240, 80).x} y2={getCoords(240, 80).y} stroke="#f44336" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-weak)" />

        {UNIT_TYPES.map((unit) => {
          const { x, y } = getCoords(unit.angle, RADIUS);
          return (
            <g key={unit.type}>
              <circle cx={x} cy={y} r="20" className="type-node-bg" />
              <text x={x} y={y} dy=".3em" textAnchor="middle" className="type-icon">{unit.icon}</text>
              <text x={x} y={y + 35} textAnchor="middle" className="type-label">{unit.type}</text>
            </g>
          );
        })}
      </svg>
      <div className="star-cycle-legend">
        <div className="legend-item"><span className="line strong"></span> Strong (2x)</div>
        <div className="legend-item"><span className="line weak"></span> Weak (0.5x)</div>
      </div>
    </div>
  );
};
