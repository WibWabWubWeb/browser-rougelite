import type { MapNode } from "../types/game";
import { NodeType } from '../types/game';

export function generateMap(totalDepth: number): MapNode[] {
  const nodes: MapNode[] = [];
  const nodesByDepth: MapNode[][] = [];

  // Helper to get random non-boss type with weights
  const getRandomType = (): NodeType => {
    const weights: { type: NodeType; weight: number }[] = [
      { type: NodeType.Skirmish, weight: 50 },
      { type: NodeType.Elite, weight: 15 },
      { type: NodeType.Shop, weight: 10 },
      { type: NodeType.Event, weight: 15 },
      { type: NodeType.Repair, weight: 10 },
    ];
    
    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const w of weights) {
      if (random < w.weight) return w.type;
      random -= w.weight;
    }
    
    return NodeType.Skirmish; // Fallback
  };

  let idCounter = 0;

  // 1. Create nodes for each depth
  for (let d = 0; d <= totalDepth; d++) {
    const nodesAtDepth: MapNode[] = [];
    
    // Boss at final depth, 2-4 nodes otherwise
    const count = d === totalDepth ? 1 : Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < count; i++) {
      const node: MapNode = {
        id: `node-${idCounter++}`,
        type: d === totalDepth ? NodeType.Boss : getRandomType(),
        depth: d,
        connections: [],
      };
      nodesAtDepth.push(node);
      nodes.push(node);
    }
    nodesByDepth[d] = nodesAtDepth;
  }

  // 2. Connect nodes forward
  for (let d = 0; d < totalDepth; d++) {
    const currentLevel = nodesByDepth[d];
    const nextLevel = nodesByDepth[d + 1];

    // Every node in current level must connect to at least one in next
    currentLevel.forEach(node => {
      const numConnections = Math.min(nextLevel.length, Math.floor(Math.random() * 2) + 1);
      const shuffledNext = [...nextLevel].sort(() => Math.random() - 0.5);
      for (let i = 0; i < numConnections; i++) {
        node.connections.push(shuffledNext[i].id);
      }
    });

    // Ensure every node in next level has at least one incoming connection
    nextLevel.forEach(nextNodes => {
      const hasIncoming = currentLevel.some(curr => curr.connections.includes(nextNodes.id));
      if (!hasIncoming) {
        const randomCurr = currentLevel[Math.floor(Math.random() * currentLevel.length)];
        randomCurr.connections.push(nextNodes.id);
      }
    });
  }

  return nodes;
}
