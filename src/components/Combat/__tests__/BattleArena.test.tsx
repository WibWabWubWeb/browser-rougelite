import { render, screen, fireEvent } from '@testing-library/react';
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
    // Unit 1 appears in both squads
    expect(screen.getAllByText('Unit 1')).toHaveLength(2);
  });

  it('starts battle when clicked', () => {
    const onBattleEnd = vi.fn();
    render(<BattleArena playerSquad={mockSquad} enemySquad={mockSquad} onBattleEnd={onBattleEnd} />);
    const btn = screen.getByText('START BATTLE');
    fireEvent.click(btn);
    expect(screen.getByText('ENGAGED')).toBeDefined();
  });
});
