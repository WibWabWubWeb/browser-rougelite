import { render, screen, fireEvent, act } from '@testing-library/react';
import { BattleArena } from '../BattleArena';
import { UnitType } from '../../../types/game';
import { describe, it, expect, vi } from 'vitest';

const mockSquad = [
  { id: '1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 2, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
  { id: '2', name: 'Unit 2', type: UnitType.Ion, hp: 10, maxHp: 10, atk: 2, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
  { id: '3', name: 'Unit 3', type: UnitType.Toxic, hp: 10, maxHp: 10, atk: 2, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] }
];

describe('BattleArena', () => {
  it('renders start button and units', () => {
    render(<BattleArena playerSquad={mockSquad} enemySquad={mockSquad} onBattleEnd={() => {}} />);
    expect(screen.getByText('START BATTLE')).toBeDefined();
    // Unit 1 is the active unit initially for both squads
    expect(screen.getAllByText('Unit 1')).toHaveLength(2);
  });

  it('starts battle when clicked', () => {
    const onBattleEnd = vi.fn();
    render(<BattleArena playerSquad={mockSquad} enemySquad={mockSquad} onBattleEnd={onBattleEnd} />);
    const btn = screen.getByText('START BATTLE');
    fireEvent.click(btn);
    expect(screen.getByText('ENGAGED')).toBeDefined();
  });

  it('increments ATB when fighting', async () => {
    vi.useFakeTimers();
    render(<BattleArena playerSquad={mockSquad} enemySquad={mockSquad} onBattleEnd={() => {}} />);
    fireEvent.click(screen.getByText('START BATTLE'));
    
    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText('ENGAGED')).toBeDefined();
    vi.useRealTimers();
  });

  it('tags in next unit when active unit dies', async () => {
    vi.useFakeTimers();
    // Player has a weak unit that will die
    const weakSquad = [
      { id: '1', name: 'Weak 1', type: UnitType.Thermal, hp: 1, maxHp: 1, atk: 1, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] },
      { id: '2', name: 'Unit 2', type: UnitType.Ion, hp: 10, maxHp: 10, atk: 2, speed: 10, level: 1, xp: 0, xpToNext: 10, milestones: [] }
    ];
    // Enemy has a strong unit that will kill Weak 1
    const strongEnemy = [
      { id: 'e1', name: 'Strong 1', type: UnitType.Thermal, hp: 100, maxHp: 100, atk: 10, speed: 200, level: 1, xp: 0, xpToNext: 10, milestones: [] }
    ];
    
    render(<BattleArena playerSquad={weakSquad} enemySquad={strongEnemy} onBattleEnd={() => {}} />);
    fireEvent.click(screen.getByText('START BATTLE'));

    // Advance 1 tick (100ms)
    // Strong 1 speed 200 -> 100 ATB -> Attacks Weak 1 -> Weak 1 dies -> Unit 2 tagged in
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    
    // Check if Unit 2 is now rendered as text (active unit)
    expect(screen.getByText('Unit 2')).toBeDefined();
    vi.useRealTimers();
  });

  it('calls onBattleEnd with final HPs', async () => {
    vi.useFakeTimers();
    const onBattleEnd = vi.fn();
    const quickSquad = [
      { id: 'q1', name: 'Quick', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 100, speed: 1000, level: 1, xp: 0, xpToNext: 10, milestones: [] }
    ];
    const weakEnemy = [
      { id: 'e1', name: 'Weak', type: UnitType.Thermal, hp: 1, maxHp: 1, atk: 1, speed: 1, level: 1, xp: 0, xpToNext: 10, milestones: [] }
    ];

    render(<BattleArena playerSquad={quickSquad} enemySquad={weakEnemy} onBattleEnd={onBattleEnd} />);
    fireEvent.click(screen.getByText('START BATTLE'));

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(onBattleEnd).toHaveBeenCalledWith('victory', { 'q1': 10 });
    vi.useRealTimers();
  });
});
