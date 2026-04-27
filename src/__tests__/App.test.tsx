import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

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
});
