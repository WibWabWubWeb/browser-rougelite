import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShopScreen } from '../ShopScreen';

describe('ShopScreen', () => {
  const mockSquad = [
    { id: 'u1', name: 'Marine', hp: 10, maxHp: 10, atk: 5, speed: 5, level: 1, xp: 0, xpToNext: 10, milestones: [], atkType: 'Thermal', defType: 'Plating' }
  ];

  it('renders shop categories and credit total', () => {
    render(
      <ShopScreen
        credits={500}
        squad={mockSquad as any}
        buyItem={vi.fn()}
        equipModule={vi.fn()}
        recruit={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText(/Credits: 500/i)).toBeInTheDocument();
    expect(screen.getByText(/Consumables/i)).toBeInTheDocument();
    expect(screen.getByText(/Modules/i)).toBeInTheDocument();
    expect(screen.getByText(/Recruits/i)).toBeInTheDocument();
  });
});
