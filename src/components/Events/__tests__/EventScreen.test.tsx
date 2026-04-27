import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EventScreen } from '../EventScreen';
import type { GameEvent } from '../../../types/game';

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
  it('renders title, prompt, and choices with outcome transparency', () => {
    render(<EventScreen event={mockEvent} onResolve={vi.fn()} />);
    expect(screen.getByText('Test Event Title')).toBeDefined();
    expect(screen.getByText('Test event prompt description.')).toBeDefined();
    
    // Check choices
    expect(screen.getByText('Choice 1')).toBeDefined();
    expect(screen.getByText('Description 1')).toBeDefined();
    
    // Check outcome transparency (preview text)
    expect(screen.getByText('Outcome 1')).toBeDefined();
    expect(screen.getByText('Outcome 2')).toBeDefined();
  });

  it('shows result overlay and calls onResolve when a choice is clicked', async () => {
    const onResolve = vi.fn();
    render(<EventScreen event={mockEvent} onResolve={onResolve} />);
    
    // Initial state: No "Result" header
    expect(screen.queryByText('Result')).toBeNull();

    // Click a choice
    fireEvent.click(screen.getByText('Choice 2'));
    
    // Overlay state: Shows "Result" and the specific outcome text
    expect(screen.getByText('Result')).toBeDefined();
    expect(screen.getByText('Outcome 2')).toBeDefined();
    
    // Verify "Continue" button works
    const continueBtn = screen.getByText('Continue');
    fireEvent.click(continueBtn);
    
    expect(onResolve).toHaveBeenCalledWith(mockEvent.choices[1].outcomes[0]);
  });
});
