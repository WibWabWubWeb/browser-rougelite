import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { LevelUp } from '../LevelUp';
import type { Unit } from '../../../types/game';
import { AttackType, ArmorType } from '../../../types/game';

const mockLeveledUnits: Unit[] = [
  {
    id: '1',
    name: 'Interceptor',
    atkType: AttackType.Thermal,
    defType: ArmorType.Plating,
    hp: 40,
    maxHp: 50,
    atk: 10,
    speed: 15,
    level: 3,
    xp: 0,
    xpToNext: 100,
    milestones: [],
  },
];

describe('LevelUp', () => {
  test('renders leveled units and reward options', () => {
    render(
      <LevelUp 
        leveledUnits={mockLeveledUnits} 
        onSelectStat={() => {}} 
        onSelectMilestone={() => {}} 
        onConfirm={() => {}} 
      />
    );
    
    expect(screen.getByText('Level Up!')).toBeDefined();
    expect(screen.getByText('Interceptor')).toBeDefined();
    expect(screen.getByText('Choose Reward:')).toBeDefined();
  });

  test('handles milestone ability selection', () => {
    const onSelectMilestone = vi.fn();
    render(
      <LevelUp 
        leveledUnits={mockLeveledUnits} 
        onSelectStat={() => {}} 
        onSelectMilestone={onSelectMilestone} 
        onConfirm={() => {}} 
      />
    );
    
    const abilityBtn = screen.getByText('Heavy Shielding');
    fireEvent.click(abilityBtn);
    
    expect(onSelectMilestone).toHaveBeenCalledWith('1', 'Heavy Shielding');
  });

  test('confirm button is disabled until all selections are made', () => {
    const onConfirm = vi.fn();
    render(
      <LevelUp 
        leveledUnits={mockLeveledUnits} 
        onSelectStat={() => {}} 
        onSelectMilestone={() => {}} 
        onConfirm={onConfirm} 
      />
    );
    
    const confirmBtn = screen.getByText('Confirm and Continue');
    expect(confirmBtn.hasAttribute('disabled')).toBe(true);
  });
});
