import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../useGameState';
import { describe, it, expect } from 'vitest';
import type { Unit } from '../../types/game';
import { UnitType, NodeType } from '../../types/game';

describe('useGameState', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.squad.length).toBe(3); // Initial 3 units
    expect(result.current.state.credits).toBe(100);
    expect(result.current.state.screen).toBe('MAP');
    expect(result.current.state.map.length).toBeGreaterThan(0);
  });

  it('should travel to a node', () => {
    const { result } = renderHook(() => useGameState());
    const firstNode = result.current.state.map[0];
    
    act(() => {
      result.current.travel(firstNode.id);
    });

    expect(result.current.state.currentNodeId).toBe(firstNode.id);
    expect(result.current.state.currentLevel).toBe(firstNode.depth);
    
    // Screen depends on node type
    if (firstNode.type === NodeType.Skirmish || firstNode.type === NodeType.Elite || firstNode.type === NodeType.Boss) {
      expect(result.current.state.screen).toBe('BATTLE');
    } else if (firstNode.type === NodeType.Shop) {
      expect(result.current.state.screen).toBe('SHOP');
    } else {
      expect(result.current.state.screen).toBe('EVENT');
    }
  });

  it('should recruit a unit', () => {
    const { result } = renderHook(() => useGameState());
    const initialLength = result.current.state.squad.length;
    const mockUnit: Unit = {
      id: 'u-new',
      name: 'Test Unit',
      type: UnitType.Thermal,
      hp: 10,
      maxHp: 10,
      atk: 5,
      speed: 10,
      level: 1,
      xp: 0,
      xpToNext: 10,
      milestones: []
    };

    act(() => {
      result.current.recruit(mockUnit, 50);
    });

    expect(result.current.state.squad).toHaveLength(initialLength + 1);
    expect(result.current.state.squad.find(u => u.id === 'u-new')).toBeDefined();
    expect(result.current.state.credits).toBe(50);
  });

  it('should resolve battle results', () => {
    const { result } = renderHook(() => useGameState());
    const firstUnitId = result.current.state.squad[0].id;
    const initialCredits = result.current.state.credits;

    act(() => {
      result.current.resolveBattle(5, 20, { [firstUnitId]: 10 });
    });

    const updatedUnit = result.current.state.squad.find(u => u.id === firstUnitId)!;
    expect(updatedUnit.hp).toBe(10);
    expect(updatedUnit.xp).toBe(5);
    expect(result.current.state.credits).toBe(initialCredits + 20);
  });

  it('should handle level up in battle resolution', () => {
    const { result } = renderHook(() => useGameState());
    const firstUnitId = result.current.state.squad[0].id;

    // Set XP close to level up manually if we could, but we'll just give enough XP
    act(() => {
      result.current.resolveBattle(25, 0, {}); // Initial xpToNext is 20
    });

    const updatedUnit = result.current.state.squad.find(u => u.id === firstUnitId)!;
    expect(updatedUnit.level).toBe(2);
    expect(updatedUnit.xp).toBe(5); // 25 - 20 = 5
    expect(result.current.state.screen).toBe('LEVEL_UP');
  });

  it('should heal a unit', () => {
    const { result } = renderHook(() => useGameState());
    const firstUnitId = result.current.state.squad[0].id;
    
    // Damage first
    act(() => {
      result.current.resolveBattle(0, 0, { [firstUnitId]: 10 });
    });

    const damagedHp = result.current.state.squad[0].hp;
    expect(damagedHp).toBe(10);

    act(() => {
      result.current.healUnit(firstUnitId, 5, 10);
    });

    expect(result.current.state.squad[0].hp).toBe(damagedHp + 5);
    expect(result.current.state.credits).toBe(90);
  });

  it('should not heal beyond max HP', () => {
    const { result } = renderHook(() => useGameState());
    const firstUnitId = result.current.state.squad[0].id;

    act(() => {
      result.current.healUnit(firstUnitId, 100, 0);
    });

    expect(result.current.state.squad[0].hp).toBe(result.current.state.squad[0].maxHp);
  });

  it('should upgrade unit stats', () => {
    const { result } = renderHook(() => useGameState());
    const firstUnitId = result.current.state.squad[0].id;
    const initialAtk = result.current.state.squad[0].atk;

    act(() => {
      result.current.upgradeUnit(firstUnitId, { atk: 5 });
    });

    expect(result.current.state.squad[0].atk).toBe(initialAtk + 5);
  });
});
