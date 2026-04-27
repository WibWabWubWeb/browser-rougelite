import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StarCycleGraph } from '../StarCycleGraph';

describe('StarCycleGraph', () => {
  it('renders correctly', () => {
    render(<StarCycleGraph />);
    expect(screen.getByText('Star Cycle')).toBeInTheDocument();
  });

  it('renders all unit types', () => {
    render(<StarCycleGraph />);
    const unitTypes = ['Thermal', 'Plating', 'Bio', 'Ion', 'Shields', 'Toxic'];
    unitTypes.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('renders SVG with markers', () => {
    const { container } = render(<StarCycleGraph />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('#arrowhead-strong')).toBeInTheDocument();
    expect(container.querySelector('#arrowhead-weak')).toBeInTheDocument();
  });
});
