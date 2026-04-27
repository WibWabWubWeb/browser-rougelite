import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { DraftScreen } from '../DraftScreen';

describe('DraftScreen', () => {
  test('renders 3 squad options', () => {
    render(<DraftScreen onSelect={() => {}} />);
    expect(screen.getByText('Squad 1')).toBeDefined();
    expect(screen.getByText('Squad 2')).toBeDefined();
    expect(screen.getByText('Squad 3')).toBeDefined();
  });

  test('calls onSelect when a squad is picked', () => {
    const onSelect = vi.fn();
    render(<DraftScreen onSelect={onSelect} />);
    
    const selectButtons = screen.getAllByText('Select Squad');
    fireEvent.click(selectButtons[0]);
    
    expect(onSelect).toHaveBeenCalled();
    expect(onSelect.mock.calls[0][0]).toHaveLength(3);
  });
});
