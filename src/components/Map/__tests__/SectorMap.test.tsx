import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { SectorMap } from '../SectorMap';
import { MapNode, NodeType } from '../../../types/game';

const mockMap: MapNode[] = [
  { id: '1', type: NodeType.Skirmish, depth: 0, connections: ['2'] },
  { id: '2', type: NodeType.Boss, depth: 1, connections: [] },
];

describe('SectorMap', () => {
  test('renders nodes and handles travel', () => {
    const onTravel = vi.fn();
    render(
      <SectorMap 
        map={mockMap} 
        currentNodeId="1" 
        currentLevel={0} 
        onTravel={onTravel} 
      />
    );
    
    expect(screen.getByTestId('sector-map')).toBeDefined();
    
    // Check for Skirmish icon (⚔️) and Boss icon (👑)
    expect(screen.getByText('⚔️')).toBeDefined();
    const nextNode = screen.getByText('👑');
    expect(nextNode).toBeDefined();
    
    // Click the boss node (which should be selectable from node 1)
    fireEvent.click(nextNode);
    expect(onTravel).toHaveBeenCalledWith('2');
  });

  test('initial state handles null currentNodeId', () => {
    const onTravel = vi.fn();
    render(
      <SectorMap 
        map={mockMap} 
        currentNodeId={null} 
        currentLevel={0} 
        onTravel={onTravel} 
      />
    );
    
    // First node should be selectable
    const firstNode = screen.getByText('⚔️');
    fireEvent.click(firstNode);
    expect(onTravel).toHaveBeenCalledWith('1');
  });
});
