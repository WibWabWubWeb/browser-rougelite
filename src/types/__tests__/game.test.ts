import { describe, test, expect } from 'vitest';
import { UnitType, NodeType } from '../game';
import type { Unit, MapNode } from '../game';

describe('Core Game Types', () => {
  test('UnitType enum has expected values', () => {
    expect(UnitType.Thermal).toBe('Thermal');
    expect(UnitType.Ion).toBe('Ion');
    expect(UnitType.Toxic).toBe('Toxic');
    expect(UnitType.Plating).toBe('Plating');
    expect(UnitType.Shields).toBe('Shields');
    expect(UnitType.Bio).toBe('Bio');
  });

  test('NodeType enum has expected values', () => {
    expect(NodeType.Skirmish).toBe('Skirmish');
    expect(NodeType.Elite).toBe('Elite');
    expect(NodeType.Shop).toBe('Shop');
    expect(NodeType.Event).toBe('Event');
    expect(NodeType.Repair).toBe('Repair');
    expect(NodeType.Boss).toBe('Boss');
  });

  test('Unit interface structure', () => {
    const unit: Unit = {
      id: '1',
      name: 'Soldier',
      type: UnitType.Thermal,
      hp: 100,
      maxHp: 100,
      atk: 10,
      speed: 10,
      level: 1,
      xp: 0,
      xpToNext: 100,
      milestones: []
    };
    expect(unit.id).toBe('1');
  });

  test('MapNode interface structure', () => {
    const node: MapNode = {
      id: 'n1',
      type: NodeType.Skirmish,
      connections: [],
      depth: 0
    };
    expect(node.id).toBe('n1');
  });
});
