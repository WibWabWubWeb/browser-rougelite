import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BattleArena } from '../BattleArena';
import { AttackType, ArmorType } from '../../../types/game';
import type { Unit } from '../../../types/game';

const mockPlayerSquad: Unit[] = [
  { id: 'p1', name: 'Player 1', atkType: AttackType.Thermal, defType: ArmorType.Plating, hp: 50, maxHp: 50, atk: 10, speed: 10, level: 1, xp: 0, xpToNext: 100, milestones: [] },
];

const mockEnemySquad: Unit[] = [
  { id: 'e1', name: 'Enemy 1', atkType: AttackType.Ion, defType: ArmorType.Shields, hp: 50, maxHp: 50, atk: 10, speed: 10, level: 1, xp: 0, xpToNext: 100, milestones: [] },
];

describe('BattleArena', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  test('renders initial idle state', () => {
    render(<BattleArena playerSquad={mockPlayerSquad} enemySquad={mockEnemySquad} onBattleEnd={() => {}} />);
    expect(screen.getByText('START BATTLE')).toBeDefined();
    expect(screen.getByText('Player 1')).toBeDefined();
    expect(screen.getByText('Enemy 1')).toBeDefined();
  });

  test('starts combat and progresses ATB', () => {
    render(<BattleArena playerSquad={mockPlayerSquad} enemySquad={mockEnemySquad} onBattleEnd={() => {}} />);
    
    const startBtn = screen.getByText('START BATTLE');
    fireEvent.click(startBtn);
    
    expect(screen.getByText('ENGAGED')).toBeDefined();
    
    act(() => {
      vi.advanceTimersByTime(1000); // 10 ticks * 5 ATB/tick = 50% ATB
    });

    // Check if logs are appearing (basic proxy for combat running)
    expect(screen.getByText(/Combat initiated/)).toBeDefined();
  });

  test('handles battle victory', async () => {
    const onBattleEnd = vi.fn();
    const weakEnemy: Unit[] = [{ ...mockEnemySquad[0], hp: 1, maxHp: 50 }];
    
    render(<BattleArena playerSquad={mockPlayerSquad} enemySquad={weakEnemy} onBattleEnd={onBattleEnd} />);
    
    fireEvent.click(screen.getByText('START BATTLE'));
    
    act(() => {
      vi.advanceTimersByTime(2000); // Should be enough for one attack
    });

    expect(onBattleEnd).toHaveBeenCalledWith('victory', expect.any(Object));
  });

  test('renders speed controls and updates active speed', () => {
    render(<BattleArena playerSquad={mockPlayerSquad} enemySquad={mockEnemySquad} onBattleEnd={() => {}} />);
    
    const speed1x = screen.getByText('1x');
    const speed2x = screen.getByText('2x');
    const speed4x = screen.getByText('4x');

    expect(speed1x).toBeDefined();
    expect(speed2x).toBeDefined();
    expect(speed4x).toBeDefined();

    expect(speed1x.className).toContain('active');
    
    fireEvent.click(speed2x);
    expect(speed2x.className).toContain('active');
    expect(speed1x.className).not.toContain('active');
  });

  test('SKIP button instantly resolves the battle', async () => {
    const onBattleEnd = vi.fn();
    const weakEnemy: Unit[] = [{ ...mockEnemySquad[0], hp: 1, maxHp: 50 }];
    
    render(<BattleArena playerSquad={mockPlayerSquad} enemySquad={weakEnemy} onBattleEnd={onBattleEnd} />);
    
    fireEvent.click(screen.getByText('START BATTLE'));
    
    const skipBtn = screen.getByText('SKIP');
    fireEvent.click(skipBtn);
    
    expect(onBattleEnd).toHaveBeenCalledWith('victory', expect.any(Object));
  });

  test('handles 6-unit squad and tagging in', () => {
    const squad6: Unit[] = Array(6).fill(null).map((_, i) => ({
      id: `p${i+1}`,
      name: `Player ${i+1}`,
      atkType: AttackType.Thermal,
      defType: ArmorType.Plating,
      hp: 10,
      maxHp: 10,
      atk: 10,
      speed: 10,
      level: 1,
      xp: 0,
      xpToNext: 100,
      milestones: []
    }));

    // Strong enemy that can take down multiple player units
    const strongEnemy: Unit[] = [{
      id: 'e1',
      name: 'Strong Enemy',
      atkType: AttackType.Ion,
      defType: ArmorType.Shields,
      hp: 200,
      maxHp: 200,
      atk: 20, // 20 damage will 1-shot a player unit
      speed: 15, // Faster than player
      level: 10,
      xp: 0,
      xpToNext: 1000,
      milestones: []
    }];

    render(<BattleArena playerSquad={squad6} enemySquad={strongEnemy} onBattleEnd={() => {}} />);
    
    fireEvent.click(screen.getByText('START BATTLE'));

    // Check that Player 1 is initially present
    expect(screen.getByText('Player 1')).toBeDefined();

    // Advance time to let Player 1 fall and Player 2 tag in
    act(() => {
      vi.advanceTimersByTime(2000); 
    });
    expect(screen.getByText('Player 2')).toBeDefined();

    // Advance more to let more units fall
    act(() => {
      vi.advanceTimersByTime(4000); 
    });
    
    // Check for later units tagging in (4th, 5th, or 6th)
    // Depending on timing, it might be any of them, but we want to see they CAN appear
    const foundAnyLateUnit = ['Player 4', 'Player 5', 'Player 6'].some(name => {
      try {
        return screen.getByText(name) !== null;
      } catch {
        return false;
      }
    });
    
    expect(foundAnyLateUnit).toBe(true);
  });
});
