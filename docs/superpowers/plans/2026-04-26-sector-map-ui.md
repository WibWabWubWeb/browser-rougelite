# SectorMap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a visual branching map for sector navigation in the Star-Commander roguelite.

**Architecture:** A React component that renders nodes grouped by depth. It uses CSS Flexbox for columns (depths) and absolute positioning/SVG for connections.

**Tech Stack:** React, TypeScript, Vanilla CSS, SVG.

---

### Task 1: Basic Scaffolding and Styles

**Files:**
- Create: `src/components/Map/SectorMap.tsx`
- Create: `src/components/Map/SectorMap.css`

- [ ] **Step 1: Create `SectorMap.css` with basic theme**

```css
.sector-map-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #0a0a0c;
  padding: 40px;
  position: relative;
  display: flex;
  gap: 120px;
}

.map-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 60px;
  position: relative;
  z-index: 1;
}

.node {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #1a1a20;
  border: 2px solid #3a3a45;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: all 0.2s ease;
  position: relative;
  color: #fff;
  font-size: 0.8rem;
}

.node.selectable {
  cursor: pointer;
  border-color: #4facfe;
  box-shadow: 0 0 10px rgba(79, 172, 254, 0.4);
}

.node.selectable:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(79, 172, 254, 0.6);
}

.node.current {
  border-color: #00f2fe;
  background: #2a2a35;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.6);
}

.node.visited {
  opacity: 0.6;
}

.connections-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connection-line {
  stroke: #3a3a45;
  stroke-width: 2;
  fill: none;
}

.connection-line.active {
  stroke: #4facfe;
  stroke-dasharray: 5;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  from { stroke-dashoffset: 10; }
  to { stroke-dashoffset: 0; }
}
```

- [ ] **Step 2: Create `SectorMap.tsx` with skeleton structure**

```tsx
import React from 'react';
import { MapNode, NodeType } from '../../types/game';
import './SectorMap.css';

interface SectorMapProps {
  map: MapNode[];
  currentNodeId: string | null;
  currentLevel: number;
  onTravel: (nodeId: string) => void;
}

export const SectorMap: React.FC<SectorMapProps> = ({
  map,
  currentNodeId,
  currentLevel,
  onTravel
}) => {
  return (
    <div className="sector-map-container" data-testid="sector-map">
      {/* TODO: Content */}
    </div>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Map/SectorMap.tsx src/components/Map/SectorMap.css
git commit -m "feat: initial scaffolding for SectorMap"
```

---

### Task 2: Implement Node Rendering

**Files:**
- Modify: `src/components/Map/SectorMap.tsx`

- [ ] **Step 1: Group nodes by depth in `SectorMap`**

```tsx
  const nodesByDepth = React.useMemo(() => {
    const groups: MapNode[][] = [];
    map.forEach(node => {
      if (!groups[node.depth]) groups[node.depth] = [];
      groups[node.depth].push(node);
    });
    return groups;
  }, [map]);
```

- [ ] **Step 2: Render columns of nodes**

```tsx
      {nodesByDepth.map((column, depth) => (
        <div key={depth} className="map-column">
          {column.map(node => (
            <div
              key={node.id}
              id={node.id}
              className={`node ${currentNodeId === node.id ? 'current' : ''}`}
            >
              {node.type[0]}
            </div>
          ))}
        </div>
      ))}
```

- [ ] **Step 3: Implement node visuals (icons/labels based on `NodeType`)**

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Map/SectorMap.tsx
git commit -m "feat: render nodes grouped by depth in SectorMap"
```

---

### Task 3: Implement Connection Lines

**Files:**
- Modify: `src/components/Map/SectorMap.tsx`

- [ ] **Step 1: Add SVG overlay for connections**
- [ ] **Step 2: Calculate line coordinates based on node positions using Refs**

```tsx
  const nodeRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  const connections = React.useMemo(() => {
    const lines: Array<{ from: string, to: string }> = [];
    map.forEach(node => {
      node.connections.forEach(targetId => {
        lines.push({ from: node.id, to: targetId });
      });
    });
    return lines;
  }, [map]);
```

- [ ] **Step 3: Render SVG paths for connections**

```tsx
      <svg className="connections-overlay">
        {connections.map((conn, i) => (
          <ConnectionLine
            key={i}
            fromId={conn.from}
            toId={conn.to}
            nodeRefs={nodeRefs}
          />
        ))}
      </svg>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Map/SectorMap.tsx
git commit -m "feat: add connection lines to SectorMap"
```

---

### Task 4: Navigation Logic and Interactive States

**Files:**
- Modify: `src/components/Map/SectorMap.tsx`

- [ ] **Step 1: Implement `isNodeSelectable` logic**

```tsx
  const isSelectable = (node: MapNode) => {
    if (currentNodeId === null) {
      return node.depth === 0;
    }
    const currentNode = map.find(n => n.id === currentNodeId);
    return currentNode?.connections.includes(node.id) || false;
  };
```

- [ ] **Step 2: Add click handler and call `onTravel`**
- [ ] **Step 3: Add visual states (active, visited, unreachable)**

```tsx
            <div
              key={node.id}
              ref={el => nodeRefs.current[node.id] = el}
              className={`node 
                ${currentNodeId === node.id ? 'current' : ''} 
                ${isSelectable(node) ? 'selectable' : ''}
                ${node.depth < currentLevel ? 'visited' : ''}
              `}
              onClick={() => isSelectable(node) && onTravel(node.id)}
            >
              {getNodeIcon(node.type)}
            </div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Map/SectorMap.tsx
git commit -m "feat: implement navigation logic in SectorMap"
```

---

### Task 5: Testing

**Files:**
- Create: `src/components/Map/__tests__/SectorMap.test.tsx`

- [ ] **Step 1: Write test to verify map renders nodes**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SectorMap } from '../SectorMap';
import { MapNode, NodeType } from '../../../types/game';

const mockMap: MapNode[] = [
  { id: '1', type: NodeType.Skirmish, depth: 0, connections: ['2'] },
  { id: '2', type: NodeType.Boss, depth: 1, connections: [] },
];

test('renders nodes and handles travel', () => {
  const onTravel = vi.fn();
  render(
    <SectorMap 
      map={mockMap} 
      currentNodeId="1" 
      currentLevel={0} 
      onTravel={onTravel} 
    />
  );
  
  expect(screen.getByTestId('sector-map')).toBeDefined();
  const nextNode = screen.getByText('👑'); // Boss icon
  fireEvent.click(nextNode);
  expect(onTravel).toHaveBeenCalledWith('2');
});
```

- [ ] **Step 2: Run tests and verify**
- [ ] **Step 3: Commit**

```bash
git add src/components/Map/__tests__/SectorMap.test.tsx
git commit -m "test: add tests for SectorMap"
```
