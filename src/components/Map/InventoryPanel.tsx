import { useState } from 'react';
import type { ShopItem, Unit } from '../../types/game';
import { TargetSelectionModal } from '../Shared/TargetSelectionModal';
import './InventoryPanel.css';

interface InventoryPanelProps {
  inventory: ShopItem[];
  squad: Unit[];
  useItem: (itemId: string, unitId: string) => void;
}

export function InventoryPanel({ inventory, squad, useItem }: InventoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const consumables = inventory.filter(item => item.category === 'consumable');

  if (consumables.length === 0) return null;

  const handleItemClick = (item: ShopItem) => {
    setSelectedItem(item);
  };

  const handleConfirmUse = (unitId: string) => {
    if (selectedItem) {
      useItem(selectedItem.id, unitId);
      setSelectedItem(null);
    }
  };

  return (
    <div className={`inventory-overlay ${isOpen ? 'open' : 'collapsed'}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Inventory' : 'Inventory'}
      </button>
      
      {isOpen && (
        <div className="inventory-content">
          <h3>Consumables</h3>
          <div className="inventory-grid">
            {consumables.map(item => (
              <div 
                key={item.id} 
                className="inventory-item"
                onClick={() => handleItemClick(item)}
              >
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <TargetSelectionModal
          title={`Use ${selectedItem.name}`}
          squad={squad}
          onSelect={handleConfirmUse}
          onCancel={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
