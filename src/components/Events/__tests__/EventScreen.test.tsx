import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EventScreen } from '../EventScreen';
import { GameEvent } from '../../../types/game';

const mockEvent: GameEvent = {
  id: 'test-event',
  title: 'Test Event Title',
  prompt: 'Test event prompt description.',
  choices: [
    {
      id: 'choice-1',
      label: 'Choice 1',
      description: 'Description 1',
      outcomes: [{ id: 'out-1', text: 'Outcome 1' }]
    },
    {
      id: 'choice-2',
      label: 'Choice 2',
      description: 'Description 2',
      outcomes: [{ id: 'out-2', text: 'Outcome 2' }]
    }
  ]
};

describe('EventScreen', () => {
  it('renders title and choices', () => {
    render(<EventScreen event={mockEvent} onResolve={vi.fn()} />);
    expect(screen.getByText('Test Event Title')).toBeDefined();
    expect(screen.getByText('Test event prompt description.')).toBeDefined();
    expect(screen.getByText('Choice 1')).toBeDefined();
    expect(screen.getByText('Choice 2')).toBeDefined();
  });

  it('shows result and calls onResolve when a choice is clicked', async () => {
    const onResolve = vi.fn();
    render(<EventScreen event={mockEvent} onResolve={onResolve} />);
    
    fireEvent.click(screen.getByText('Choice 1'));
    
    expect(screen.getByText('Outcome 1')).toBeDefined();
    
    // The component should show the result for a bit, then call onResolve
    // For testing purposes, we use a "Continue" button
    const continueBtn = screen.getByText('Continue');
    fireEvent.click(continueBtn);
    
    expect(onResolve).toHaveBeenCalledWith(mockEvent.choices[0].outcomes[0]);
  });
});
