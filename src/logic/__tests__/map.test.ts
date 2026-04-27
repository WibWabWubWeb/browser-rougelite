import { describe, it, expect } from 'vitest';
import { generateMap } from '../map';
import { NodeType, AttackType, ArmorType } from '../../types/game';

describe('generateMap', () => {
  const totalDepth = 5;
  const nodes = generateMap(totalDepth);

  it('should return a list of nodes', () => {
    expect(Array.isArray(nodes)).toBe(true);
    expect(nodes.length).toBeGreaterThan(0);
  });

  it('should have at least one node at each depth level from 0 to totalDepth', () => {
    for (let d = 0; d <= totalDepth; d++) {
      const nodesAtDepth = nodes.filter(n => n.depth === d);
      expect(nodesAtDepth.length).toBeGreaterThan(0);
    }
  });

  it('should connect nodes forward (depth N connects to depth N+1)', () => {
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const targetNode = nodes.find(n => n.id === targetId);
        expect(targetNode).toBeDefined();
        expect(targetNode!.depth).toBe(node.depth + 1);
      });
    });
  });

  it('should assign intel for battle nodes', () => {
    const battleNodes = nodes.filter(n => 
      ([NodeType.Skirmish, NodeType.Elite, NodeType.Boss] as string[]).includes(n.type)
    );
    battleNodes.forEach(node => {
      expect(node.intelAtkType).toBeDefined();
      expect(node.intelDefType).toBeDefined();
      expect(Object.values(AttackType)).toContain(node.intelAtkType);
      expect(Object.values(ArmorType)).toContain(node.intelDefType);
    });
  });
});
