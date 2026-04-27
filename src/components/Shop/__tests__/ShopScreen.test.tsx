import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShopScreen } from '../ShopScreen';

describe('ShopScreen', () => {
  const mockUnit = { 
    id: 'u1', 
    name: 'Marine', 
    hp: 10, 
    maxHp: 10, 
    atk: 5, 
    speed: 5, 
    level: 1, 
    xp: 0, 
    xpToNext: 10, 
    milestones: [], 
    atkType: 'Thermal', 
    defType: 'Plating' 
  };
  
  const mockSquad = [mockUnit];

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

  describe('Recruitment Logic', () => {
    it('automatically recruits when squad size < 6', async () => {
      const recruitSpy = vi.fn();
      const squad = [mockUnit]; // Size 1
      render(
        <ShopScreen
          credits={500}
          squad={squad as any}
          buyItem={vi.fn()}
          equipModule={vi.fn()}
          recruit={recruitSpy}
          onClose={vi.fn()}
        />
      );

      const hireButton = screen.getByRole('button', { name: /Hire/i });
      fireEvent.click(hireButton);

      expect(recruitSpy).toHaveBeenCalled();
      expect(screen.queryByText(/Select unit to replace/i)).not.toBeInTheDocument();
    });

    it('automatically recruits when squad size is 5', async () => {
      const recruitSpy = vi.fn();
      const squad = Array(5).fill(mockUnit).map((u, i) => ({ ...u, id: `u${i}` }));
      render(
        <ShopScreen
          credits={500}
          squad={squad as any}
          buyItem={vi.fn()}
          equipModule={vi.fn()}
          recruit={recruitSpy}
          onClose={vi.fn()}
        />
      );

      const hireButton = screen.getByRole('button', { name: /Hire/i });
      fireEvent.click(hireButton);

      expect(recruitSpy).toHaveBeenCalled();
      expect(screen.queryByText(/Select unit to replace/i)).not.toBeInTheDocument();
    });

    it('triggers replacement modal when squad size is 6', async () => {
      const recruitSpy = vi.fn();
      const fullSquad = Array(6).fill(mockUnit).map((u, i) => ({ ...u, id: `u${i}` }));
      render(
        <ShopScreen
          credits={500}
          squad={fullSquad as any}
          buyItem={vi.fn()}
          equipModule={vi.fn()}
          recruit={recruitSpy}
          onClose={vi.fn()}
        />
      );

      const hireButton = screen.getByRole('button', { name: /Hire/i });
      fireEvent.click(hireButton);

      expect(recruitSpy).not.toHaveBeenCalled();
      expect(screen.getByText(/Select unit to replace/i)).toBeInTheDocument();
    });
  });
});
