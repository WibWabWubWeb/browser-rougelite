import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { StarCycleGraph } from '../StarCycleGraph';

describe('StarCycleGraph', () => {
  test('renders all attack types', () => {
    render(<StarCycleGraph />);
    expect(screen.getByText('Thermal')).toBeDefined();
    expect(screen.getByText('Ion')).toBeDefined();
    expect(screen.getByText('Toxic')).toBeDefined();
  });

  test('renders all armor types', () => {
    render(<StarCycleGraph />);
    expect(screen.getByText('Plating')).toBeDefined();
    expect(screen.getByText('Shields')).toBeDefined();
    expect(screen.getByText('Bio')).toBeDefined();
  });

  test('renders the SVG with labels', () => {
    render(<StarCycleGraph />);
    expect(screen.getByText('ATTACK')).toBeDefined();
    expect(screen.getByText('ARMOR')).toBeDefined();
  });
});
