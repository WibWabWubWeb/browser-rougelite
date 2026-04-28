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

export interface EventOutcome {
  id: string;
  text: string;
  credits?: number;
  hp?: number; // percentage of current HP, e.g. -10 means -10%
  xp?: number;
  item?: ShopItem;
  chance?: number; // 0.0 to 1.0, used when choice has multiple outcomes
  removeUnit?: boolean; // If true, the targetUnitId will be removed from squad
  newUnit?: Unit; // If present, this unit will be added to the squad
}

export interface EventChoice {
  id: string;
  label: string;
  description: string;
  outcomes: EventOutcome[];
  
  // Specific requirements that modify chances or outcomes
  unitRequirements?: {
    atkType?: AttackType;
    defType?: ArmorType;
    chanceOverride?: number;
    outcomeOverride?: EventOutcome;
  }[];
  
  // If true, the player must select a unit from their squad to perform this action
  requiresUnitSelection?: boolean;
}

export interface GameEvent {
  id: string;
  title: string;
  prompt: string;
  choices: EventChoice[];
}
