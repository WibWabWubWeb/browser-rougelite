import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TargetSelectionModal } from '../TargetSelectionModal';
import type { Unit } from '../../../types/game';

const mockSquad: Unit[] = [
  {
    id: 'u1',
    name: 'Marine',
    atkType: 'Thermal',
    defType: 'Plating',
    hp: 100,
    maxHp: 100,
    atk: 10,
    speed: 5,
    level: 1,
    xp: 0,
    xpToNext: 100,
    milestones: []
  },
  {
    id: 'u2',
    name: 'Sniper',
    atkType: 'Ion',
    defType: 'Bio',
    hp: 80,
    maxHp: 80,
    atk: 15,
    speed: 6,
    level: 2,
    xp: 50,
    xpToNext: 200,
    milestones: ['Piercing']
  }
];

describe('TargetSelectionModal', () => {
  it('renders the title and squad units', () => {
    render(
      <TargetSelectionModal
        title="Select Target"
        squad={mockSquad}
        onSelect={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText('Select Target')).toBeInTheDocument();
    expect(screen.getByText('Marine')).toBeInTheDocument();
    expect(screen.getByText('Sniper')).toBeInTheDocument();
    expect(screen.getByText('100 / 100 HP')).toBeInTheDocument();
    expect(screen.getByText('80 / 80 HP')).toBeInTheDocument();
  });

  it('calls onSelect with unit id and index when a unit is clicked', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <TargetSelectionModal
        title="Select Target"
        squad={mockSquad}
        onSelect={handleSelect}
        onCancel={vi.fn()}
      />
    );

    const marineCard = screen.getByText('Marine');
    await user.click(marineCard);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith('u1', 0);
  });

  it('calls onCancel when the Cancel button is clicked', async () => {
    const handleCancel = vi.fn();
    const user = userEvent.setup();

    render(
      <TargetSelectionModal
        title="Select Target"
        squad={mockSquad}
        onSelect={vi.fn()}
        onCancel={handleCancel}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
