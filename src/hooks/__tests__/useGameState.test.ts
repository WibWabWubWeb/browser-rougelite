import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../useGameState';
import { describe, it, expect } from 'vitest';
import type { Unit } from '../../types/game';
import { UnitType, NodeType } from '../../types/game';

describe('useGameState', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.squad.length).toBe(0); // Starts empty
    expect(result.current.state.credits).toBe(100);
    expect(result.current.state.screen).toBe('DRAFT'); // Starts in DRAFT
    expect(result.current.state.map.length).toBeGreaterThan(0);
  });

  it('should handle choosing squad and transitioning to MAP', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad: Unit[] = [
      { id: 'u1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
      { id: 'u2', name: 'Unit 2', type: UnitType.Ion, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
    ];

    act(() => {
      // @ts-ignore - we'll add this method to the hook soon
      result.current.chooseSquad(mockSquad);
    });

    expect(result.current.state.squad).toHaveLength(2);
    expect(result.current.state.screen).toBe('MAP');
  });

  it('should reorder the squad', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad: Unit[] = [
      { id: 'u1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
      { id: 'u2', name: 'Unit 2', type: UnitType.Ion, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
    ];

    act(() => {
      // @ts-ignore
      result.current.chooseSquad(mockSquad);
    });

    act(() => {
      // @ts-ignore
      result.current.reorderSquad(['u2', 'u1']);
    });

    expect(result.current.state.squad[0].id).toBe('u2');
    expect(result.current.state.squad[1].id).toBe('u1');
  });

  it('should travel to a node', () => {
    const { result } = renderHook(() => useGameState());
    
    // Must choose squad first to move to MAP
    act(() => {
      // @ts-ignore
      result.current.chooseSquad([]);
    });

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
    
    act(() => {
      // @ts-ignore
      result.current.chooseSquad([]);
    });

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
    const mockUnit: Unit = { id: 'u1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    
    act(() => {
      // @ts-ignore
      result.current.chooseSquad([mockUnit]);
    });

    const initialCredits = result.current.state.credits;

    act(() => {
      result.current.resolveBattle(5, 20, { 'u1': 8 });
    });

    const updatedUnit = result.current.state.squad.find(u => u.id === 'u1')!;
    expect(updatedUnit.hp).toBe(8);
    expect(updatedUnit.xp).toBe(5);
    expect(result.current.state.credits).toBe(initialCredits + 20);
  });

  it('should handle level up in battle resolution', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit: Unit = { id: 'u1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    
    act(() => {
      // @ts-ignore
      result.current.chooseSquad([mockUnit]);
    });

    // Set XP close to level up manually if we could, but we'll just give enough XP
    act(() => {
      result.current.resolveBattle(15, 0, {}); // Initial xpToNext is 10
    });

    const updatedUnit = result.current.state.squad.find(u => u.id === 'u1')!;
    expect(updatedUnit.level).toBe(2);
    expect(updatedUnit.xp).toBe(5); // 15 - 10 = 5
    expect(result.current.state.screen).toBe('LEVEL_UP');
  });

  it('should heal a unit', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit: Unit = { id: 'u1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    
    act(() => {
      // @ts-ignore
      result.current.chooseSquad([mockUnit]);
    });
    
    // Damage first
    act(() => {
      result.current.resolveBattle(0, 0, { 'u1': 4 });
    });

    const damagedHp = result.current.state.squad[0].hp;
    expect(damagedHp).toBe(4);

    act(() => {
      result.current.healUnit('u1', 5, 10);
    });

    expect(result.current.state.squad[0].hp).toBe(damagedHp + 5);
    expect(result.current.state.credits).toBe(90);
  });

  it('should not heal beyond max HP', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit: Unit = { id: 'u1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    
    act(() => {
      // @ts-ignore
      result.current.chooseSquad([mockUnit]);
    });

    act(() => {
      result.current.healUnit('u1', 100, 0);
    });

    expect(result.current.state.squad[0].hp).toBe(result.current.state.squad[0].maxHp);
  });

  it('should upgrade unit stats', () => {
    const { result } = renderHook(() => useGameState());
    const mockUnit: Unit = { id: 'u1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    
    act(() => {
      // @ts-ignore
      result.current.chooseSquad([mockUnit]);
    });
    const initialAtk = result.current.state.squad[0].atk;

    act(() => {
      result.current.upgradeUnit('u1', { atk: 5 });
    });

    expect(result.current.state.squad[0].atk).toBe(initialAtk + 5);
  });
});
