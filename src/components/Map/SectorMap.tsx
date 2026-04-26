import React from 'react';
import { MapNode, NodeType } from '../../types/game';
import './SectorMap.css';

interface SectorMapProps {
  map: MapNode[];
  currentNodeId: string | null;
  currentLevel: number;
  onTravel: (nodeId: string) => void;
}

const getNodeIcon = (type: NodeType) => {
  switch (type) {
    case 'Skirmish': return '⚔️';
    case 'Elite': return '💀';
    case 'Shop': return '💰';
    case 'Event': return '❓';
    case 'Repair': return '🔧';
    case 'Boss': return '👑';
    default: return '•';
  }
};

interface ConnectionLineProps {
  fromId: string;
  toId: string;
  nodeRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ fromId, toId, nodeRefs, containerRef, isActive }) => {
  const [coords, setCoords] = React.useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  React.useLayoutEffect(() => {
    const updateCoords = () => {
      const fromEl = nodeRefs.current?.[fromId];
      const toEl = nodeRefs.current?.[toId];
      const containerEl = containerRef.current;

      if (fromEl && toEl && containerEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();

        setCoords({
          x1: fromRect.left + fromRect.width / 2 - containerRect.left + containerEl.scrollLeft,
          y1: fromRect.top + fromRect.height / 2 - containerRect.top + containerEl.scrollTop,
          x2: toRect.left + toRect.width / 2 - containerRect.left + containerEl.scrollLeft,
          y2: toRect.top + toRect.height / 2 - containerRect.top + containerEl.scrollTop,
        });
      }
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, [fromId, toId, nodeRefs, containerRef]);

  if (!coords) return null;

  return (
    <line
      x1={coords.x1}
      y1={coords.y1}
      x2={coords.x2}
      y2={coords.y2}
      className={`connection-line ${isActive ? 'active' : ''}`}
    />
  );
};

export const SectorMap: React.FC<SectorMapProps> = ({
  map,
  currentNodeId,
  currentLevel,
  onTravel
}) => {
  const nodeRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const nodesByDepth = React.useMemo(() => {
    const groups: MapNode[][] = [];
    map.forEach(node => {
      if (!groups[node.depth]) groups[node.depth] = [];
      groups[node.depth].push(node);
    });
    return groups;
  }, [map]);

  const connections = React.useMemo(() => {
    const lines: Array<{ from: string; to: string; active: boolean }> = [];
    map.forEach(node => {
      node.connections.forEach(targetId => {
        lines.push({
          from: node.id,
          to: targetId,
          active: node.id === currentNodeId
        });
      });
    });
    return lines;
  }, [map, currentNodeId]);

  const isSelectable = (node: MapNode) => {
    if (currentNodeId === null) {
      return node.depth === 0;
    }
    const currentNode = map.find(n => n.id === currentNodeId);
    return currentNode?.connections.includes(node.id) || false;
  };

  return (
    <div className="sector-map-container" data-testid="sector-map" ref={containerRef}>
      <svg className="connections-overlay">
        {connections.map((conn, i) => (
          <ConnectionLine
            key={`${conn.from}-${conn.to}-${i}`}
            fromId={conn.from}
            toId={conn.to}
            nodeRefs={nodeRefs}
            containerRef={containerRef}
            isActive={conn.active}
          />
        ))}
      </svg>
      {nodesByDepth.map((column, depth) => (
        <div key={depth} className="map-column">
          {column.map(node => (
            <div
              key={node.id}
              id={node.id}
              ref={el => { nodeRefs.current[node.id] = el; }}
              className={`node 
                ${currentNodeId === node.id ? 'current' : ''} 
                ${isSelectable(node) ? 'selectable' : ''}
                ${node.depth < currentLevel ? 'visited' : ''}
              `}
              onClick={() => isSelectable(node) && onTravel(node.id)}
              title={node.type}
            >
              {getNodeIcon(node.type)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
