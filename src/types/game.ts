export const UnitType = {
  Thermal: 'Thermal',
  Ion: 'Ion',
  Toxic: 'Toxic',
  Plating: 'Plating',
  Shields: 'Shields',
  Bio: 'Bio'
} as const;

export type UnitType = (typeof UnitType)[keyof typeof UnitType];

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
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
}
