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
});
