import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { SectorMap } from '../SectorMap';
import type { MapNode } from "../../../types/game";
import { NodeType, AttackType, ArmorType } from '../../../types/game';

const mockMap: MapNode[] = [
  { id: '1', type: NodeType.Skirmish, depth: 0, connections: ['2'], intelAtkType: AttackType.Thermal, intelDefType: ArmorType.Plating },
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
        squad={[]}
        onReorder={() => {}}
      />
    );
    
    expect(screen.getByTestId('sector-map')).toBeDefined();
    
    // Check for Skirmish icon (⚔️)
    expect(screen.getByText('⚔️')).toBeDefined();
    
    // Click the boss node
    const bossNode = screen.getByText('👑');
    fireEvent.click(bossNode);
    expect(onTravel).toHaveBeenCalledWith('2');
  });

  test('renders intel icons for battle nodes', () => {
    render(
      <SectorMap 
        map={mockMap} 
        currentNodeId={null} 
        currentLevel={0} 
        onTravel={() => {}} 
        squad={[]}
        onReorder={() => {}}
      />
    );
    
    // Check for Thermal icon (🔥) and Plating icon (🛡️) in intel
    expect(screen.getByText('🔥')).toBeDefined();
    expect(screen.getByText('🛡️')).toBeDefined();
  });
});
