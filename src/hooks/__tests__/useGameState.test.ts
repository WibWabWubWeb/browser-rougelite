import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../useGameState';
import { describe, it, expect } from 'vitest';
import type { Unit } from '../../types/game';
import { AttackType, ArmorType, NodeType } from '../../types/game';

describe('useGameState', () => {
  const getMockSquad = (): Unit[] => [
    { id: 'u1', name: 'Unit 1', atkType: AttackType.Thermal, defType: ArmorType.Plating, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
    { id: 'u2', name: 'Unit 2', atkType: AttackType.Ion, defType: ArmorType.Shields, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
  ];

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.squad.length).toBe(0);
    expect(result.current.state.credits).toBe(100);
    expect(result.current.state.screen).toBe('DRAFT');
    expect(result.current.state.map.length).toBeGreaterThan(0);
  });

  it('should handle choosing squad and transitioning to MAP', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();

    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    expect(result.current.state.squad).toHaveLength(2);
    expect(result.current.state.screen).toBe('MAP');
  });

  it('should reorder the squad', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();

    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    act(() => {
      result.current.reorderSquad([mockSquad[1], mockSquad[0]]);
    });

    expect(result.current.state.squad[0].id).toBe('u2');
    expect(result.current.state.squad[1].id).toBe('u1');
  });

  it('should travel to a node', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.chooseSquad([]);
    });

    const firstNode = result.current.state.map[0];
    
    act(() => {
      result.current.travel(firstNode.id);
    });

    expect(result.current.state.currentNodeId).toBe(firstNode.id);
    expect(result.current.state.currentLevel).toBe(firstNode.depth);
    
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
      result.current.chooseSquad([]);
    });

    const mockUnit: Unit = {
      id: 'u-new',
      name: 'Test Unit',
      atkType: AttackType.Thermal,
      defType: ArmorType.Plating,
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

    expect(result.current.state.squad).toHaveLength(1);
    expect(result.current.state.credits).toBe(50);
  });

  it('should resolve battle results', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();
    
    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    act(() => {
      result.current.resolveBattle(5, 20, { 'u1': 8 });
    });

    const updatedUnit = result.current.state.squad.find(u => u.id === 'u1')!;
    expect(updatedUnit.hp).toBe(8);
    expect(updatedUnit.xp).toBe(5);
    expect(result.current.state.credits).toBe(120);
  });

  it('should handle level up in battle resolution', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();
    
    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    act(() => {
      result.current.resolveBattle(15, 0, {}); 
    });

    const updatedUnit = result.current.state.squad.find(u => u.id === 'u1')!;
    expect(updatedUnit.level).toBe(2);
    expect(updatedUnit.xp).toBe(5); 
    expect(result.current.state.screen).toBe('LEVEL_UP');
  });

  it('should upgrade unit stats', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();
    
    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    act(() => {
      result.current.upgradeUnit('u1', { atk: 5 });
    });

    expect(result.current.state.squad.find(u => u.id === 'u1')!.atk).toBe(10);
  });

  it('should buy an item and add it to inventory', () => {
    const { result } = renderHook(() => useGameState());
    
    const mockItem = {
      id: 'item1',
      name: 'Medkit',
      category: 'consumable' as const,
      cost: 50,
      description: 'Heals 5 HP',
      effect: { hp: 5 }
    };

    act(() => {
      result.current.buyItem(mockItem);
    });

    expect(result.current.state.inventory).toHaveLength(1);
    expect(result.current.state.inventory[0].id).toBe('item1');
    expect(result.current.state.credits).toBe(50);
  });

  it('should use an item and apply its effect', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();
    mockSquad[0].hp = 5; // Damaged unit

    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    const mockItem = {
      id: 'item1',
      name: 'Medkit',
      category: 'consumable' as const,
      cost: 50,
      description: 'Heals 5 HP',
      effect: { hp: 5 }
    };

    act(() => {
      result.current.buyItem(mockItem);
    });

    act(() => {
      result.current.useItem('item1', 'u1');
    });

    expect(result.current.state.inventory).toHaveLength(0);
    expect(result.current.state.squad.find(u => u.id === 'u1')!.hp).toBe(10);
  });

  it('should equip a module and apply permanent stats', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();

    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    const mockModule = {
      id: 'mod1',
      name: 'Laser Sight',
      category: 'module' as const,
      cost: 50,
      description: '+2 ATK',
      effect: { atk: 2 }
    };

    act(() => {
      result.current.buyItem(mockModule);
    });

    act(() => {
      result.current.equipModule(mockModule, 'u1');
    });

    expect(result.current.state.inventory).toHaveLength(0);
    expect(result.current.state.squad.find(u => u.id === 'u1')!.atk).toBe(7);
  });

  it('should recruit and replace an existing unit', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();

    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    const newUnit = {
      id: 'u3',
      name: 'Unit 3',
      atkType: AttackType.Thermal,
      defType: ArmorType.Plating,
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
      result.current.recruit(newUnit, 50, 0); // Replace unit at index 0 (u1)
    });

    expect(result.current.state.squad).toHaveLength(2);
    expect(result.current.state.squad[0].id).toBe('u3');
    expect(result.current.state.credits).toBe(50);
  });

  it('should add a 4th unit instead of replacing when the squad has 3 units', () => {
    const { result } = renderHook(() => useGameState());
    
    // Setup squad with 3 units
    const initialSquad: Unit[] = [
      { id: 'u1', name: 'Unit 1', atkType: AttackType.Thermal, defType: ArmorType.Plating, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
      { id: 'u2', name: 'Unit 2', atkType: AttackType.Ion, defType: ArmorType.Shields, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
      { id: 'u3', name: 'Unit 3', atkType: AttackType.Thermal, defType: ArmorType.Plating, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
    ];

    act(() => {
      result.current.chooseSquad(initialSquad);
    });

    const newUnit: Unit = {
      id: 'u4',
      name: 'Unit 4',
      atkType: AttackType.Thermal,
      defType: ArmorType.Plating,
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
      result.current.recruit(newUnit, 50);
    });

    expect(result.current.state.squad).toHaveLength(4);
    expect(result.current.state.squad[3].id).toBe('u4');
  });

  it('should not exceed 6 units when recruiting without replacement', () => {
    const { result } = renderHook(() => useGameState());
    
    const initialSquad: Unit[] = Array(6).fill(null).map((_, i) => ({
      id: `u${i+1}`,
      name: `Unit ${i+1}`,
      atkType: AttackType.Thermal,
      defType: ArmorType.Plating,
      hp: 10,
      maxHp: 10,
      atk: 5,
      speed: 10,
      level: 1,
      xp: 0,
      xpToNext: 10,
      milestones: []
    }));

    act(() => {
      result.current.chooseSquad(initialSquad);
    });

    const newUnit: Unit = {
      id: 'u7',
      name: 'Unit 7',
      atkType: AttackType.Thermal,
      defType: ArmorType.Plating,
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
      result.current.recruit(newUnit, 50);
    });

    expect(result.current.state.squad).toHaveLength(6);
  });

  it('should resolve an event and apply comprehensive outcomes to the whole squad', () => {
    const { result } = renderHook(() => useGameState());
    
    // Initial setup: 2 units
    const unit1: Unit = { id: 'u1', name: 'Unit 1', atkType: AttackType.Thermal, defType: ArmorType.Plating, hp: 10, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    const unit2: Unit = { id: 'u2', name: 'Unit 2', atkType: AttackType.Ion, defType: ArmorType.Shields, hp: 5, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    
    act(() => {
      result.current.chooseSquad([unit1, unit2]);
    });

    const mockItem = {
      id: 'event-item',
      name: 'Rare Tech',
      category: 'module' as const,
      cost: 100,
      description: 'Found in space',
      effect: { atk: 3 }
    };

    const outcome = {
      id: 'o-comp',
      text: 'Discovery! +50 Credits, +5 XP to all, and a Rare Tech. But everyone takes 20% damage.',
      credits: 50,
      hp: -20, // -20%
      xp: 5,
      item: mockItem
    };

    act(() => {
      result.current.resolveEvent(outcome);
    });

    // Credits: 100 (initial) + 50 = 150
    expect(result.current.state.credits).toBe(150);
    
    // Unit 1: 10 HP -> 10 + Math.floor(10 * -0.2) = 10 - 2 = 8 HP
    // XP: 0 + 5 = 5
    const updatedU1 = result.current.state.squad.find(u => u.id === 'u1')!;
    expect(updatedU1.hp).toBe(8);
    expect(updatedU1.xp).toBe(5);
    
    // Unit 2: 5 HP -> 5 + Math.floor(5 * -0.2) = 5 - 1 = 4 HP
    // XP: 0 + 5 = 5
    const updatedU2 = result.current.state.squad.find(u => u.id === 'u2')!;
    expect(updatedU2.hp).toBe(4);
    expect(updatedU2.xp).toBe(5);

    // Inventory
    expect(result.current.state.inventory).toHaveLength(1);
    expect(result.current.state.inventory[0].id).toBe('event-item');
    
    // Screen transition
    expect(result.current.state.screen).toBe('MAP');
  });

  it('should handle positive HP outcomes and not exceed maxHp', () => {
    const { result } = renderHook(() => useGameState());
    const unit: Unit = { id: 'u1', name: 'Unit 1', atkType: AttackType.Thermal, defType: ArmorType.Plating, hp: 8, maxHp: 10, atk: 5, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] };
    
    act(() => {
      result.current.chooseSquad([unit]);
    });

    const outcome = {
      id: 'o-heal',
      text: 'Everyone heals 50%',
      hp: 50, // +50%
    };

    act(() => {
      result.current.resolveEvent(outcome);
    });

    // 8 + Math.floor(8 * 0.5) = 8 + 4 = 12 -> clamped to 10
    expect(result.current.state.squad[0].hp).toBe(10);
  });
});
