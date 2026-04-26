import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../useGameState';
import { describe, it, expect } from 'vitest';
import { UnitType, NodeType } from '../../types/game';

describe('useGameState', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.squad).toEqual([]);
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
    const mockUnit = {
      id: 'u1',
      name: 'Test Unit',
      type: UnitType.Thermal,
      hp: 10,
      maxHp: 10,
      atk: 5,
      level: 1,
      xp: 0,
      xpToNext: 10,
      milestones: []
    };

    act(() => {
      result.current.recruit(mockUnit, 50);
    });

    expect(result.current.state.squad).toHaveLength(1);
    expect(result.current.state.squad[0].id).toBe('u1');
    expect(result.current.state.credits).toBe(50);
  });

  it('should resolve battle results', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit = {
      id: 'u1',
      name: 'Test Unit',
      type: UnitType.Thermal,
      hp: 10,
      maxHp: 10,
      atk: 5,
      level: 1,
      xp: 0,
      xpToNext: 10,
      milestones: []
    };

    act(() => {
      result.current.recruit(mockUnit, 0);
    });

    act(() => {
      result.current.resolveBattle(5, 20, { 'u1': 3 });
    });

    expect(result.current.state.squad[0].hp).toBe(7);
    expect(result.current.state.squad[0].xp).toBe(5);
    expect(result.current.state.credits).toBe(120);
    expect(result.current.state.screen).toBe('LEVEL_UP');
  });

  it('should handle level up in battle resolution', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit = {
      id: 'u1',
      name: 'Test Unit',
      type: UnitType.Thermal,
      hp: 10,
      maxHp: 10,
      atk: 5,
      level: 1,
      xp: 8,
      xpToNext: 10,
      milestones: []
    };

    act(() => {
      result.current.recruit(mockUnit, 0);
    });

    act(() => {
      result.current.resolveBattle(5, 0, {});
    });

    expect(result.current.state.squad[0].level).toBe(2);
    expect(result.current.state.squad[0].xp).toBe(3); // 8+5 = 13, 13-10 = 3
    expect(result.current.state.squad[0].xpToNext).toBe(15); // 10 * 1.5
  });

  it('should heal a unit', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit = {
      id: 'u1',
      name: 'Test Unit',
      type: UnitType.Thermal,
      hp: 5,
      maxHp: 10,
      atk: 5,
      level: 1,
      xp: 0,
      xpToNext: 10,
      milestones: []
    };

    act(() => {
      result.current.recruit(mockUnit, 0);
    });

    act(() => {
      result.current.healUnit('u1', 3, 10);
    });

    expect(result.current.state.squad[0].hp).toBe(8);
    expect(result.current.state.credits).toBe(90);
  });

  it('should not heal beyond max HP', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit = {
      id: 'u1',
      name: 'Test Unit',
      type: UnitType.Thermal,
      hp: 8,
      maxHp: 10,
      atk: 5,
      level: 1,
      xp: 0,
      xpToNext: 10,
      milestones: []
    };

    act(() => {
      result.current.recruit(mockUnit, 0);
    });

    act(() => {
      result.current.healUnit('u1', 5, 0);
    });

    expect(result.current.state.squad[0].hp).toBe(10);
  });
});
