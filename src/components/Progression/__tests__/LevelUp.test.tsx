import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LevelUp } from '../LevelUp';
import type { Unit } from "../../../types/game";
import { UnitType } from '../../../types/game';

const mockUnits: Unit[] = [
  {
    id: '1',
    name: 'Interceptor',
    type: UnitType.Thermal,
    hp: 40,
    maxHp: 50,
    atk: 10,
    level: 2,
    xp: 0,
    xpToNext: 100,
    milestones: [],
  },
  {
    id: '2',
    name: 'Bastion',
    type: UnitType.Shields,
    hp: 80,
    maxHp: 100,
    atk: 5,
    level: 3, // Milestone level
    xp: 0,
    xpToNext: 200,
    milestones: [],
  },
];

describe('LevelUp Component', () => {
  const mockOnSelectStat = vi.fn();
  const mockOnSelectMilestone = vi.fn();
  const mockOnConfirm = vi.fn();

  const defaultProps = {
    leveledUnits: mockUnits,
    onSelectStat: mockOnSelectStat,
    onSelectMilestone: mockOnSelectMilestone,
    onConfirm: mockOnConfirm,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the list of units that leveled up', () => {
    render(<LevelUp {...defaultProps} />);
    
    expect(screen.getByText('Level Up!')).toBeInTheDocument();
    expect(screen.getByText('Interceptor')).toBeInTheDocument();
    expect(screen.getByText('Bastion')).toBeInTheDocument();
    expect(screen.getAllByText(/New Level:/)).toHaveLength(2);
    expect(screen.getByText('New Level: 2')).toBeInTheDocument();
    expect(screen.getByText('New Level: 3')).toBeInTheDocument();
  });

  it('calls onSelectStat when a stat boost button is clicked', () => {
    render(<LevelUp {...defaultProps} />);
    
    // Interceptor is level 2 (not milestone)
    const atkButton = screen.getByText(/Increase Firepower/i);
    fireEvent.click(atkButton);
    
    expect(mockOnSelectStat).toHaveBeenCalledWith('1', 'atk');
  });

  it('calls onSelectMilestone when a milestone button is clicked', () => {
    render(<LevelUp {...defaultProps} />);
    
    // Bastion is level 3 (milestone)
    const milestoneButton = screen.getByText(/Heavy Shielding/i);
    fireEvent.click(milestoneButton);
    
    expect(mockOnSelectMilestone).toHaveBeenCalledWith('2', 'Heavy Shielding');
  });

  it('disables the "Confirm" button until all units have made a choice', () => {
    render(<LevelUp {...defaultProps} />);
    
    const confirmButton = screen.getByRole('button', { name: /Confirm and Continue/i });
    expect(confirmButton).toBeDisabled();
    
    // Select for unit 1 (Interceptor)
    fireEvent.click(screen.getByText(/Increase Firepower/i));
    expect(confirmButton).toBeDisabled();
    
    // Select for unit 2 (Bastion)
    fireEvent.click(screen.getByText(/Heavy Shielding/i));
    expect(confirmButton).not.toBeDisabled();
  });

  it('calls onConfirm when the "Confirm" button is clicked', () => {
    render(<LevelUp {...defaultProps} />);
    
    fireEvent.click(screen.getByText(/Increase Firepower/i));
    fireEvent.click(screen.getByText(/Heavy Shielding/i));
    
    const confirmButton = screen.getByRole('button', { name: /Confirm and Continue/i });
    fireEvent.click(confirmButton);
    
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('shows selected state on buttons', () => {
    render(<LevelUp {...defaultProps} />);
    
    const atkButton = screen.getByText(/Increase Firepower/i).closest('button');
    const hpButton = screen.getByText(/Reinforce Hull/i).closest('button');
    
    expect(atkButton).not.toHaveClass('selected');
    expect(hpButton).not.toHaveClass('selected');
    
    fireEvent.click(atkButton!);
    
    expect(atkButton).toHaveClass('selected');
    expect(hpButton).not.toHaveClass('selected');
  });
});
