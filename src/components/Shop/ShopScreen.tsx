import { useState, useEffect } from 'react';
import type { ShopItem, Unit } from '../../types/game';
import { TargetSelectionModal } from '../Shared/TargetSelectionModal';
import './ShopScreen.css';

interface ShopScreenProps {
  credits: number;
  squad: Unit[];
  buyItem: (item: ShopItem) => void;
  equipModule: (item: ShopItem, targetUnitId: string) => void;
  recruit: (unit: Unit, cost: number, index?: number) => void;
  onClose: () => void;
}

type ActiveModal = {
  type: 'module' | 'recruit';
  item?: ShopItem;
  unit?: Unit;
  cost?: number;
};

export function ShopScreen({
  credits,
  squad,
  buyItem,
  equipModule,
  recruit,
  onClose
}: ShopScreenProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  
  const [consumables, setConsumables] = useState<ShopItem[]>([]);
  const [modules, setModules] = useState<ShopItem[]>([]);
  const [recruits, setRecruits] = useState<{unit: Unit, cost: number}[]>([]);

  useEffect(() => {
    // Generate mock inventory on mount
    setConsumables([
      { id: 'c1', name: 'Small Medkit', category: 'consumable', cost: 20, description: 'Heals 20 HP', effect: { hp: 20 } },
      { id: 'c2', name: 'Large Medkit', category: 'consumable', cost: 50, description: 'Heals 50 HP', effect: { hp: 50 } },
    ]);

    setModules([
      { id: 'm1', name: 'Plating Upgrade', category: 'module', cost: 75, description: 'Grants +10 Max HP', effect: { maxHp: 10 } },
      { id: 'm2', name: 'Weapon Mod', category: 'module', cost: 100, description: 'Grants +5 ATK', effect: { atk: 5 } },
    ]);

    setRecruits([
      {
        unit: {
          id: `u-${Date.now()}`,
          name: 'Rookie Marine',
          atkType: 'Thermal',
          defType: 'Plating',
          hp: 25,
          maxHp: 25,
          atk: 4,
          speed: 6,
          level: 1,
          xp: 0,
          xpToNext: 100,
          milestones: []
        },
        cost: 150
      }
    ]);
  }, []);

  const handleBuyConsumable = (item: ShopItem) => {
    if (credits >= item.cost) {
      buyItem(item);
    }
  };

  const handleBuyModuleClick = (item: ShopItem) => {
    if (credits >= item.cost) {
      setActiveModal({ type: 'module', item });
    }
  };

  const handleHireRecruitClick = (unit: Unit, cost: number) => {
    if (credits >= cost) {
      if (squad.length < 6) {
        recruit(unit, cost);
      } else {
        setActiveModal({ type: 'recruit', unit, cost });
      }
    }
  };

  const handleModalSelect = (unitId: string, index: number) => {
    if (!activeModal) return;

    if (activeModal.type === 'module' && activeModal.item) {
      equipModule(activeModal.item, unitId);
    } else if (activeModal.type === 'recruit' && activeModal.unit && activeModal.cost) {
      recruit(activeModal.unit, activeModal.cost, index);
    }

    setActiveModal(null);
  };

  return (
    <div className="shop-screen">
      <header className="shop-header">
        <h1>Trade Hub</h1>
        <div className="shop-stats">
          <span>Credits: {credits}</span>
        </div>
        <button className="nav-button" onClick={onClose}>Return to Map</button>
      </header>

      <div className="shop-content">
        <div className="shop-column">
          <h2>Consumables</h2>
          <div className="item-list">
            {consumables.map(item => (
              <div key={item.id} className="shop-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="card-footer">
                  <span className="cost">{item.cost} CR</span>
                  <button 
                    disabled={credits < item.cost}
                    onClick={() => handleBuyConsumable(item)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shop-column">
          <h2>Modules</h2>
          <div className="item-list">
            {modules.map(item => (
              <div key={item.id} className="shop-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="card-footer">
                  <span className="cost">{item.cost} CR</span>
                  <button 
                    disabled={credits < item.cost}
                    onClick={() => handleBuyModuleClick(item)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shop-column">
          <h2>Recruits</h2>
          <div className="item-list">
            {recruits.map(({ unit, cost }, idx) => (
              <div key={idx} className="shop-card">
                <h3>{unit.name}</h3>
                <p>Level {unit.level} | {unit.atkType} / {unit.defType}</p>
                <div className="card-footer">
                  <span className="cost">{cost} CR</span>
                  <button 
                    disabled={credits < cost}
                    onClick={() => handleHireRecruitClick(unit, cost)}
                  >
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal && (
        <TargetSelectionModal
          title={activeModal.type === 'module' ? "Select unit to equip module" : "Select unit to replace"}
          squad={squad}
          onSelect={handleModalSelect}
          onCancel={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
