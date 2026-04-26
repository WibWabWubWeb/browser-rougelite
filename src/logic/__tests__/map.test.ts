import { describe, it, expect } from 'vitest';
import { generateMap } from '../map';
import { NodeType } from '../../types/game';

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

  it('should have only Boss type nodes at the final depth', () => {
    const finalNodes = nodes.filter(n => n.depth === totalDepth);
    finalNodes.forEach(node => {
      expect(node.type).toBe(NodeType.Boss);
    });
  });

  it('should not have Boss nodes at any depth other than the final depth', () => {
    const nonFinalNodes = nodes.filter(n => n.depth < totalDepth);
    nonFinalNodes.forEach(node => {
      expect(node.type).not.toBe(NodeType.Boss);
    });
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

  it('should ensure every node except Boss has at least one outgoing connection', () => {
    nodes.forEach(node => {
      if (node.type !== NodeType.Boss) {
        expect(node.connections.length).toBeGreaterThan(0);
      } else {
        expect(node.connections.length).toBe(0);
      }
    });
  });

  it('should ensure every node (except starting nodes at depth 0) is reachable from a previous depth', () => {
    nodes.forEach(node => {
      if (node.depth > 0) {
        const incoming = nodes.filter(n => n.connections.includes(node.id));
        expect(incoming.length).toBeGreaterThan(0);
      }
    });
  });
});
