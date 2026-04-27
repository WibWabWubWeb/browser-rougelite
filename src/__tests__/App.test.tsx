import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App, { generateEnemySquad } from '../App';
import { ArmorType } from '../types/game';

describe('App Integration', () => {
  it('starts on the draft screen and transitions to the map screen after selecting a squad', async () => {
    render(<App />);
    
    // Check if on Draft Screen
    expect(screen.getByText('Initial Deployment')).toBeDefined();
    
    // Select the first squad
    const selectButtons = screen.getAllByText('Select Squad');
    fireEvent.click(selectButtons[0]);
    
    // Should now be on Map Screen
    expect(screen.getByText('Sector Navigation')).toBeDefined();
    expect(screen.getByTestId('sector-map')).toBeDefined();
  });

  it('generates an enemy squad with consistent armor types if forcedDefType is provided', () => {
    const level = 1;
    const forcedDefType = ArmorType.Shields;
    const squad = generateEnemySquad(level, forcedDefType);
    
    expect(squad.length).toBe(3);
    expect(squad.every(unit => unit.defType === forcedDefType)).toBe(true);
    
    // AtkTypes should still be from the pool, might not be all identical
    // But testing for non-uniformity might be flaky, so we just verify they exist
    expect(squad.every(unit => unit.atkType)).toBe(true);
  });
});
