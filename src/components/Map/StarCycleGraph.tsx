import React from 'react';
import './StarCycleGraph.css';

const ATK_TYPES = [
  { type: 'Thermal', icon: '🔥', x: 80, y: 60 },
  { type: 'Ion', icon: '⚡', x: 80, y: 110 },
  { type: 'Toxic', icon: '☣️', x: 80, y: 160 },
  { type: 'Kinetic', icon: '☄️', x: 80, y: 210 },
  { type: 'Laser', icon: '🔦', x: 80, y: 260 },
  { type: 'Cryo', icon: '❄️', x: 80, y: 310 },
];

const DEF_TYPES = [
  { type: 'Plating', icon: '🛡️', x: 320, y: 60 },
  { type: 'Shields', icon: '🌀', x: 320, y: 110 },
  { type: 'Bio', icon: '🌿', x: 320, y: 160 },
  { type: 'Ceramic', icon: '🏺', x: 320, y: 210 },
  { type: 'Prism', icon: '💎', x: 320, y: 260 },
  { type: 'NanoFiber', icon: '🧶', x: 320, y: 310 },
];

const NODE_RADIUS = 18;

// Multipliers for visualization
// Thermal: S: Plating(0), NanoFiber(5); W: Shields(1), Ceramic(3)
// Ion: S: Shields(1), NanoFiber(5); W: Bio(2), Prism(4)
// Toxic: S: Bio(2), Ceramic(3); W: Plating(0), NanoFiber(5)
// Kinetic: S: Shields(1), Prism(4); W: Plating(0), NanoFiber(5)
// Laser: S: Bio(2), Ceramic(3); W: Shields(1), Prism(4)
// Cryo: S: Plating(0), Prism(4); W: Bio(2), Ceramic(3)

const CONNECTIONS = [
  // Thermal
  { from: 0, to: 0, strong: true }, { from: 0, to: 5, strong: true }, { from: 0, to: 1, strong: false }, { from: 0, to: 3, strong: false },
  // Ion
  { from: 1, to: 1, strong: true }, { from: 1, to: 5, strong: true }, { from: 1, to: 2, strong: false }, { from: 1, to: 4, strong: false },
  // Toxic
  { from: 2, to: 2, strong: true }, { from: 2, to: 3, strong: true }, { from: 2, to: 0, strong: false }, { from: 2, to: 5, strong: false },
  // Kinetic
  { from: 3, to: 1, strong: true }, { from: 3, to: 4, strong: true }, { from: 3, to: 0, strong: false }, { from: 3, to: 5, strong: false },
  // Laser
  { from: 4, to: 2, strong: true }, { from: 4, to: 3, strong: true }, { from: 4, to: 1, strong: false }, { from: 4, to: 4, strong: false },
  // Cryo
  { from: 5, to: 0, strong: true }, { from: 5, to: 4, strong: true }, { from: 5, to: 2, strong: false }, { from: 5, to: 3, strong: false },
];

export const StarCycleGraph: React.FC = () => {
  const [hoveredAtkIndex, setHoveredAtkIndex] = React.useState<number | null>(null);
  const [hoveredDefIndex, setHoveredDefIndex] = React.useState<number | null>(null);

  return (
    <div className="star-cycle-container">
      <h3>Combat Matrix (6x6)</h3>
      <svg viewBox="0 0 400 380" className="star-cycle-svg">
        <defs>
          <marker id="arrowhead-strong" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#4caf50" />
          </marker>
          <marker id="arrowhead-weak" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#f44336" />
          </marker>
        </defs>

        {/* Labels */}
        <text x="80" y="30" textAnchor="middle" fill="#aaa" fontSize="12" fontWeight="bold">ATTACK</text>
        <text x="320" y="30" textAnchor="middle" fill="#aaa" fontSize="12" fontWeight="bold">ARMOR</text>

        {/* Connections */}
        {CONNECTIONS.map((conn, idx) => {
          const isAtkHighlighted = hoveredAtkIndex === conn.from;
          const isDefHighlighted = hoveredDefIndex === conn.to;
          const isHighlighted = isAtkHighlighted || isDefHighlighted;
          const isDimmed = (hoveredAtkIndex !== null || hoveredDefIndex !== null) && !isHighlighted;
          
          return (
            <line 
              key={idx}
              x1={ATK_TYPES[conn.from].x + NODE_RADIUS} 
              y1={ATK_TYPES[conn.from].y} 
              x2={DEF_TYPES[conn.to].x - NODE_RADIUS} 
              y2={DEF_TYPES[conn.to].y} 
              stroke={conn.strong ? "#4caf50" : "#f44336"} 
              strokeWidth={isHighlighted ? "2.5" : "1"} 
              strokeDasharray={conn.strong ? "0" : "3 2"} 
              markerEnd={conn.strong ? "url(#arrowhead-strong)" : "url(#arrowhead-weak)"}
              className={`matrix-line ${isHighlighted ? 'highlight' : ''} ${isDimmed ? 'dimmed' : ''}`}
            />
          );
        })}

        {/* Attack Nodes */}
        {ATK_TYPES.map((node, idx) => {
          const isDirectlyHighlighted = hoveredAtkIndex === idx;
          const isConnectedToDef = hoveredDefIndex !== null && CONNECTIONS.some(c => c.from === idx && c.to === hoveredDefIndex);
          const isHighlighted = isDirectlyHighlighted || isConnectedToDef;
          const isDimmed = (hoveredAtkIndex !== null || hoveredDefIndex !== null) && !isHighlighted;
          
          return (
            <g 
              key={node.type} 
              className={`type-node-group clickable ${isHighlighted ? 'active' : ''} ${isDimmed ? 'dim' : ''}`}
              onMouseEnter={() => setHoveredAtkIndex(idx)}
              onMouseLeave={() => setHoveredAtkIndex(null)}
            >
              <circle cx={node.x} cy={node.y} r={NODE_RADIUS} className="type-node-bg" />
              <text x={node.x} y={node.y} dy=".35em" textAnchor="middle" className="type-icon">{node.icon}</text>
              <text x={node.x - 25} y={node.y} dy=".35em" textAnchor="end" className="type-label-small">{node.type}</text>
            </g>
          );
        })}

        {/* Defense Nodes */}
        {DEF_TYPES.map((node, idx) => {
          const isDirectlyHighlighted = hoveredDefIndex === idx;
          const isConnectedToAtk = hoveredAtkIndex !== null && CONNECTIONS.some(c => c.from === hoveredAtkIndex && c.to === idx);
          const isHighlighted = isDirectlyHighlighted || isConnectedToAtk;
          const isDimmed = (hoveredAtkIndex !== null || hoveredDefIndex !== null) && !isHighlighted;

          return (
            <g 
              key={node.type} 
              className={`type-node-group clickable ${isHighlighted ? 'active' : ''} ${isDimmed ? 'dim' : ''}`}
              onMouseEnter={() => setHoveredDefIndex(idx)}
              onMouseLeave={() => setHoveredDefIndex(null)}
            >
              <circle cx={node.x} cy={node.y} r={NODE_RADIUS} className="type-node-bg" />
              <text x={node.x} y={node.y} dy=".35em" textAnchor="middle" className="type-icon">{node.icon}</text>
              <text x={node.x + 25} y={node.y} dy=".35em" textAnchor="start" className="type-label-small">{node.type}</text>
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
