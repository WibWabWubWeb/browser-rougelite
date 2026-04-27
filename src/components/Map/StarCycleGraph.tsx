import React from 'react';
import './StarCycleGraph.css';

const ATK_TYPES = [
  { type: 'Thermal', icon: '🔥', x: 60, y: 80 },
  { type: 'Ion', icon: '⚡', x: 60, y: 150 },
  { type: 'Toxic', icon: '☣️', x: 60, y: 220 },
];

const DEF_TYPES = [
  { type: 'Plating', icon: '🛡️', x: 240, y: 80 },
  { type: 'Shields', icon: '🌀', x: 240, y: 150 },
  { type: 'Bio', icon: '🌿', x: 240, y: 220 },
];

const NODE_RADIUS = 20;

export const StarCycleGraph: React.FC = () => {
  return (
    <div className="star-cycle-container">
      <h3>Combat Matrix</h3>
      <svg viewBox="0 0 300 300" className="star-cycle-svg">
        <defs>
          <marker id="arrowhead-strong" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4caf50" />
          </marker>
          <marker id="arrowhead-weak" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f44336" />
          </marker>
        </defs>

        {/* Labels */}
        <text x="60" y="40" textAnchor="middle" fill="#aaa" fontSize="10" fontWeight="bold">ATTACK</text>
        <text x="240" y="40" textAnchor="middle" fill="#aaa" fontSize="10" fontWeight="bold">ARMOR</text>

        {/* Connections */}
        {/* Thermal (0) vs Plating (0) [S], Shields (1) [W] */}
        <line x1={ATK_TYPES[0].x + 20} y1={ATK_TYPES[0].y} x2={DEF_TYPES[0].x - 20} y2={DEF_TYPES[0].y} stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead-strong)" />
        <line x1={ATK_TYPES[0].x + 20} y1={ATK_TYPES[0].y} x2={DEF_TYPES[1].x - 20} y2={DEF_TYPES[1].y} stroke="#f44336" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowhead-weak)" />

        {/* Ion (1) vs Shields (1) [S], Bio (2) [W] */}
        <line x1={ATK_TYPES[1].x + 20} y1={ATK_TYPES[1].y} x2={DEF_TYPES[1].x - 20} y2={DEF_TYPES[1].y} stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead-strong)" />
        <line x1={ATK_TYPES[1].x + 20} y1={ATK_TYPES[1].y} x2={DEF_TYPES[2].x - 20} y2={DEF_TYPES[2].y} stroke="#f44336" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowhead-weak)" />

        {/* Toxic (2) vs Bio (2) [S], Plating (0) [W] */}
        <line x1={ATK_TYPES[2].x + 20} y1={ATK_TYPES[2].y} x2={DEF_TYPES[2].x - 20} y2={DEF_TYPES[2].y} stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead-strong)" />
        <line x1={ATK_TYPES[2].x + 20} y1={ATK_TYPES[2].y} x2={DEF_TYPES[0].x - 20} y2={DEF_TYPES[0].y} stroke="#f44336" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowhead-weak)" />

        {/* Attack Nodes */}
        {ATK_TYPES.map((node) => (
          <g key={node.type}>
            <circle cx={node.x} cy={node.y} r={NODE_RADIUS} className="type-node-bg" />
            <text x={node.x} y={node.y} dy=".35em" textAnchor="middle" className="type-icon">{node.icon}</text>
            <text x={node.x - 30} y={node.y} dy=".35em" textAnchor="end" className="type-label-small">{node.type}</text>
          </g>
        ))}

        {/* Defense Nodes */}
        {DEF_TYPES.map((node) => (
          <g key={node.type}>
            <circle cx={node.x} cy={node.y} r={NODE_RADIUS} className="type-node-bg" />
            <text x={node.x} y={node.y} dy=".35em" textAnchor="middle" className="type-icon">{node.icon}</text>
            <text x={node.x + 30} y={node.y} dy=".35em" textAnchor="start" className="type-label-small">{node.type}</text>
          </g>
        ))}
      </svg>
      <div className="star-cycle-legend">
        <div className="legend-item"><span className="line strong"></span> Strong (2x)</div>
        <div className="legend-item"><span className="line weak"></span> Weak (0.5x)</div>
      </div>
    </div>
  );
};
