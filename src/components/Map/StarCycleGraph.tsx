import React from 'react';
import './StarCycleGraph.css';

const UNIT_TYPES = [
  { type: 'Thermal', icon: '🔥', angle: 0 },
  { type: 'Plating', icon: '🛡️', angle: 60 },
  { type: 'Toxic', icon: '☣️', angle: 120 },
  { type: 'Bio', icon: '🌿', angle: 180 },
  { type: 'Ion', icon: '⚡', angle: 240 },
  { type: 'Shields', icon: '🌀', angle: 300 },
];

const RADIUS = 110;
const CENTER = 150;
const NODE_RADIUS = 22;

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
        
        {UNIT_TYPES.map((unit, i) => {
          const next = UNIT_TYPES[(i + 1) % UNIT_TYPES.length];
          
          // Strength Line (To next)
          const startS = getCoords(unit.angle, RADIUS - 5);
          const endS = getCoords(next.angle, RADIUS - 5);
          
          // Weakness Line (To previous)
          const prev = UNIT_TYPES[(i - 1 + UNIT_TYPES.length) % UNIT_TYPES.length];
          const startW = getCoords(unit.angle, RADIUS - 15);
          const endW = getCoords(prev.angle, RADIUS - 15);

          return (
            <g key={unit.type}>
              {/* Strong (Green) */}
              <line 
                x1={startS.x} y1={startS.y} 
                x2={endS.x} y2={endS.y} 
                stroke="#4caf50" strokeWidth="2" 
                markerEnd="url(#arrowhead-strong)" 
              />
              {/* Weak (Red) */}
              <line 
                x1={startW.x} y1={startW.y} 
                x2={endW.x} y2={endW.y} 
                stroke="#f44336" strokeWidth="1.5" 
                strokeDasharray="4 2"
                markerEnd="url(#arrowhead-weak)" 
              />
            </g>
          );
        })}

        {UNIT_TYPES.map((unit) => {
          const { x, y } = getCoords(unit.angle, RADIUS + 15);
          const nodePos = getCoords(unit.angle, RADIUS);
          return (
            <g key={`node-${unit.type}`}>
              <circle cx={nodePos.x} cy={nodePos.y} r={NODE_RADIUS} className="type-node-bg" />
              <text x={nodePos.x} y={nodePos.y} dy=".35em" textAnchor="middle" className="type-icon">{unit.icon}</text>
              <text x={x} y={y > CENTER ? y + 15 : y - 5} textAnchor="middle" className="type-label">{unit.type}</text>
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
