import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { InventoryPanel } from '../InventoryPanel';
import { ShopItem, Unit, AttackType, ArmorType } from '../../../types/game';

const mockSquad: Unit[] = [
  { id: 'u1', name: 'Alpha', hp: 10, maxHp: 10, atk: 5, speed: 5, atkType: 'Thermal', defType: 'Plating', level: 1, xp: 0, xpToNext: 10, milestones: [] },
  { id: 'u2', name: 'Beta', hp: 5, maxHp: 10, atk: 5, speed: 5, atkType: 'Ion', defType: 'Shields', level: 1, xp: 0, xpToNext: 10, milestones: [] }
];

const mockInventory: ShopItem[] = [
  { id: 'i1', name: 'Medkit', category: 'consumable', cost: 10, description: 'Heals 5 HP', effect: { heal: 5 } },
  { id: 'i2', name: 'Laser Sight', category: 'module', cost: 20, description: '+2 Atk', effect: { atk: 2 } },
  { id: 'i3', name: 'Energy Drink', category: 'consumable', cost: 5, description: '+Speed', effect: { speed: 2 } }
];

describe('InventoryPanel', () => {
  test('renders only consumable items', () => {
    const useItem = vi.fn();
    render(<InventoryPanel inventory={mockInventory} squad={mockSquad} useItem={useItem} />);
    
    // Open inventory
    fireEvent.click(screen.getByText('Inventory'));
    
    expect(screen.getByText('Medkit')).toBeInTheDocument();
    expect(screen.getByText('Energy Drink')).toBeInTheDocument();
    expect(screen.queryByText('Laser Sight')).not.toBeInTheDocument();
  });

  test('calls useItem when an item is selected and applied to a target', () => {
    const useItem = vi.fn();
    render(<InventoryPanel inventory={mockInventory} squad={mockSquad} useItem={useItem} />);
    
    // Open inventory
    fireEvent.click(screen.getByText('Inventory'));
    
    // Click consumable
    fireEvent.click(screen.getByText('Medkit'));
    
    // Verify modal is open and shows squad
    expect(screen.getByText(/Use Medkit/i)).toBeInTheDocument();
    
    // Click target
    fireEvent.click(screen.getByText('Beta'));
    
    // Confirm
    fireEvent.click(screen.getByText('Confirm'));
    
    expect(useItem).toHaveBeenCalledWith('i1', 'u2');
  });
});
