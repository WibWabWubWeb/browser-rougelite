import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';

describe('App Integration', () => {
  it('starts on the draft screen and transitions to the map screen after selecting a squad', () => {
    render(<App />);
    
    // Check if DraftScreen is rendered
    expect(screen.getByText(/Initial Deployment/i)).toBeInTheDocument();
    
    // Select a squad
    const selectButtons = screen.getAllByText(/Select Squad/i);
    fireEvent.click(selectButtons[0]);
    
    // Check if Map screen is rendered
    expect(screen.getByText(/Sector Navigation/i)).toBeInTheDocument();
  });
});
