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
        inventory={[]}
        useItem={() => {}}
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

  test('renders with fluid styles (visual check via classes)', () => {
    const { container } = render(
      <SectorMap 
        map={mockMap} 
        currentNodeId="1" 
        currentLevel={0} 
        onTravel={() => {}} 
        squad={[]}
        onReorder={() => {}}
        inventory={[]}
        useItem={() => {}}
      />
    );
    
    const containerEl = container.querySelector('.sector-map-container');
    expect(containerEl).toBeDefined();
    // We can't easily test computed styles in JSDOM for clamp(), but we can check if it rendered.
    expect(containerEl?.classList.contains('sector-map-container')).toBe(true);
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
        inventory={[]}
        useItem={() => {}}
      />
    );
    
    // Check for Thermal icon (🔥) and Plating icon (🛡️) in intel
    expect(screen.getByText('🔥')).toBeDefined();
    expect(screen.getByText('🛡️')).toBeDefined();
  });
});
