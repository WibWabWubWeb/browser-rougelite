import { render, screen } from '@testing-library/react';
import { SquadBar } from '../SquadBar';
import type { Unit } from '../../../types/game';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const mockUnit: Unit = {
  id: '1',
  name: 'Scout',
  atkType: 'Thermal' as any,
  defType: 'Plating' as any,
  hp: 80,
  maxHp: 100,
  atk: 10,
  speed: 12,
  level: 1,
  xp: 0,
  xpToNext: 100,
  milestones: []
};

describe('SquadBar', () => {
  it('renders 6 slots', () => {
    const squad: Unit[] = [mockUnit];
    render(<SquadBar squad={squad} onReorder={() => {}} />);
    
    // 1 unit card + 5 empty slots = 6 total items in squad-units
    const slots = document.querySelectorAll('.squad-unit-card, .empty-slot');
    expect(slots.length).toBe(6);
  });

  it('renders unit HP bar', () => {
    const squad: Unit[] = [mockUnit];
    render(<SquadBar squad={squad} onReorder={() => {}} />);
    
    const hpBar = document.querySelector('.unit-hp-fill');
    expect(hpBar).toBeInTheDocument();
    expect(hpBar).toHaveStyle({ width: '80%' });
    expect(screen.getByText('80/100 HP')).toBeInTheDocument();
  });

  it('renders empty slots', () => {
    const squad: Unit[] = [];
    render(<SquadBar squad={squad} onReorder={() => {}} />);
    
    const emptySlots = document.querySelectorAll('.empty-slot');
    expect(emptySlots.length).toBe(6);
  });
});
