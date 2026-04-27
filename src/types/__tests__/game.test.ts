import { describe, test, expect } from 'vitest';
import { AttackType, ArmorType, NodeType } from '../game';
import type { Unit, MapNode } from '../game';

describe('Core Game Types', () => {
  test('AttackType has expected values', () => {
    expect(AttackType.Thermal).toBe('Thermal');
    expect(AttackType.Ion).toBe('Ion');
    expect(AttackType.Toxic).toBe('Toxic');
  });

  test('ArmorType has expected values', () => {
    expect(ArmorType.Plating).toBe('Plating');
    expect(ArmorType.Shields).toBe('Shields');
    expect(ArmorType.Bio).toBe('Bio');
  });

  test('NodeType enum has expected values', () => {
    expect(NodeType.Skirmish).toBe('Skirmish');
    expect(NodeType.Elite).toBe('Elite');
    expect(NodeType.Shop).toBe('Shop');
  });

  test('Unit interface structure', () => {
    const unit: Unit = {
      id: '1',
      name: 'Soldier',
      atkType: AttackType.Thermal,
      defType: ArmorType.Plating,
      hp: 100,
      maxHp: 100,
      atk: 10,
      speed: 10,
      level: 1,
      xp: 0,
      xpToNext: 100,
      milestones: []
    };
    expect(unit.name).toBe('Soldier');
    expect(unit.atkType).toBe('Thermal');
    expect(unit.defType).toBe('Plating');
  });

  test('MapNode interface structure', () => {
    const node: MapNode = {
      id: 'node-1',
      type: NodeType.Skirmish,
      connections: ['node-2'],
      depth: 1,
      intelAtkType: AttackType.Ion,
      intelDefType: ArmorType.Shields
    };
    expect(node.type).toBe('Skirmish');
    expect(node.intelAtkType).toBe('Ion');
    expect(node.intelDefType).toBe('Shields');
  });
});
