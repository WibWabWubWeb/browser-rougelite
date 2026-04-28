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
  it('renders title, prompt, and choices', () => {
    render(<EventScreen event={mockEvent} squad={[]} onResolve={vi.fn()} recruit={vi.fn()} removeUnit={vi.fn()} />);
    expect(screen.getByText('Test Event Title')).toBeDefined();
    expect(screen.getByText('Test event prompt description.')).toBeDefined();
    
    // Check choices
    expect(screen.getByText('Choice 1')).toBeDefined();
    expect(screen.getByText('Description 1')).toBeDefined();
  });

  it('shows result overlay and calls onResolve when a choice is clicked', async () => {
    const onResolve = vi.fn();
    render(<EventScreen event={mockEvent} squad={[]} onResolve={onResolve} recruit={vi.fn()} removeUnit={vi.fn()} />);
    
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
    
    expect(onResolve).toHaveBeenCalledWith(mockEvent.choices[1].outcomes[0], undefined);
  });

  it('handles unit selection for specialized choices', () => {
    const specialistEvent: GameEvent = {
      id: 'spec-event',
      title: 'Spec Event',
      prompt: 'Need a specialist.',
      choices: [
        {
          id: 'spec-choice',
          label: 'Specialist Action',
          description: 'Uses a unit.',
          requiresUnitSelection: true,
          outcomes: [{ id: 'spec-out', text: 'Success' }]
        }
      ]
    };

    const mockSquad = [
      {
        id: 'u1',
        name: 'Unit 1',
        atkType: 'Thermal',
        defType: 'Plating',
        hp: 100,
        maxHp: 100,
        atk: 10,
        speed: 10,
        level: 1,
        xp: 0,
        xpToNext: 100,
        milestones: []
      }
    ];

    const onResolve = vi.fn();
    render(<EventScreen event={specialistEvent} squad={mockSquad as any} onResolve={onResolve} recruit={vi.fn()} removeUnit={vi.fn()} />);

    // Click choice
    fireEvent.click(screen.getByText('Specialist Action'));

    // Should show unit selection
    expect(screen.getByText('Select a Specialist')).toBeDefined();
    expect(screen.getByText('Unit 1')).toBeDefined();

    // Select unit
    fireEvent.click(screen.getByText('Unit 1'));

    // Should show result
    expect(screen.getByText('Result')).toBeDefined();
    expect(screen.getByText('Success')).toBeDefined();

    // Continue
    fireEvent.click(screen.getByText('Continue'));
    expect(onResolve).toHaveBeenCalledWith(specialistEvent.choices[0].outcomes[0], 'u1');
  });
});
