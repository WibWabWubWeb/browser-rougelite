import { render, screen, fireEvent } from '@testing-library/react';
import { DraftScreen } from '../DraftScreen';
import { vi, describe, it, expect } from 'vitest';

describe('DraftScreen', () => {
  it('renders three squad options', () => {
    const onSelect = vi.fn();
    render(<DraftScreen onSelect={onSelect} />);
    
    const squads = screen.getAllByRole('heading', { level: 3 });
    expect(squads).toHaveLength(3);
  });

  it('calls onSelect when a squad is selected', () => {
    const onSelect = vi.fn();
    render(<DraftScreen onSelect={onSelect} />);
    
    const selectButtons = screen.getAllByText(/Select Squad/i);
    fireEvent.click(selectButtons[0]);
    
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.any(Array));
  });
});
