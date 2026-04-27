export const AttackType = {
  Thermal: 'Thermal',
  Ion: 'Ion',
  Toxic: 'Toxic'
} as const;

export type AttackType = (typeof AttackType)[keyof typeof AttackType];

export const ArmorType = {
  Plating: 'Plating',
  Shields: 'Shields',
  Bio: 'Bio'
} as const;

export type ArmorType = (typeof ArmorType)[keyof typeof ArmorType];

export interface Unit {
  id: string;
  name: string;
  atkType: AttackType;
  defType: ArmorType;
  hp: number;
  maxHp: number;
  atk: number;
  speed: number;
  level: number;
  xp: number;
  xpToNext: number;
  milestones: string[];
}

export const NodeType = {
  Skirmish: 'Skirmish',
  Elite: 'Elite',
  Shop: 'Shop',
  Event: 'Event',
  Repair: 'Repair',
  Boss: 'Boss'
} as const;

export type NodeType = (typeof NodeType)[keyof typeof NodeType];

export interface MapNode {
  id: string;
  type: NodeType;
  connections: string[];
  depth: number;
  intelAtkType?: AttackType;
  intelDefType?: ArmorType;
}

export type ItemCategory = 'consumable' | 'module';

export interface ShopItem {
  id: string;
  name: string;
  category: ItemCategory;
  cost: number;
  description: string;
  effect: any;
}
