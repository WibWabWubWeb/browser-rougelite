# Star-Commander Roguelite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a functional prototype of a sci-fi squad auto-battler in the browser.

**Architecture:** A React-based application using a central custom hook for state management. Combat logic is isolated from UI, using a "Star Cycle" type system for automated 3-lane resolution.

**Tech Stack:** React, TypeScript, Vite, Vitest, Vanilla CSS.

---

## File Structure

- `src/types/game.ts`: Core interfaces for Units, Node types, and Game State.
- `src/logic/combat.ts`: Pure functions for damage calculation and lane resolution.
- `src/logic/map.ts`: Map generation and navigation logic.
- `src/hooks/useGameState.ts`: Central React hook for managing the run state.
- `src/components/Map/SectorMap.tsx`: Visualization of the branching web map.
- `src/components/Combat/BattleArena.tsx`: The 3-lane siege interface.
- `src/components/Recruitment/UnitChoice.tsx`: Post-battle and Shop interfaces.
- `src/components/Progression/LevelUp.tsx`: Stat boost and Milestone choice UI.
- `src/App.tsx`: Main game loop and screen switching.

---

### Task 1: Core Types Definition

**Files:**
- Create: `src/types/game.ts`

- [ ] **Step 1: Define core enums and interfaces**

```typescript
export enum UnitType {
  Thermal = 'Thermal',
  Ion = 'Ion',
  Toxic = 'Toxic',
  Plating = 'Plating',
  Shields = 'Shields',
  Bio = 'Bio'
}

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  hp: number;
  maxHp: number;
  atk: number;
  level: number;
  xp: number;
  xpToNext: number;
  milestones: string[];
}

export enum NodeType {
  Skirmish = 'Skirmish',
  Elite = 'Elite',
  Shop = 'Shop',
  Event = 'Event',
  Repair = 'Repair',
  Boss = 'Boss'
}

export interface MapNode {
  id: string;
  type: NodeType;
  connections: string[];
  depth: number;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/game.ts
git commit -m "feat: define core game types"
```

---

### Task 2: Combat Logic (The Star Cycle)

**Files:**
- Create: `src/logic/combat.ts`
- Test: `src/logic/__tests__/combat.test.ts`

- [ ] **Step 1: Write combat logic tests**

```typescript
import { calculateDamage, UnitType } from '../combat';

describe('Combat Logic', () => {
  test('Thermal counters Plating and Bio', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Plating, 10)).toBe(20);
    expect(calculateDamage(UnitType.Thermal, UnitType.Bio, 10)).toBe(20);
    expect(calculateDamage(UnitType.Thermal, UnitType.Shields, 10)).toBe(5);
  });
});
```

- [ ] **Step 2: Run tests (Verify failure)**
Run: `npm test src/logic/__tests__/combat.test.ts`

- [ ] **Step 3: Implement `calculateDamage`**

```typescript
import { UnitType } from '../types/game';

const multipliers: Record<UnitType, Partial<Record<UnitType, number>>> = {
  [UnitType.Thermal]: { [UnitType.Plating]: 2, [UnitType.Bio]: 2, [UnitType.Shields]: 0.5 },
  [UnitType.Ion]: { [UnitType.Shields]: 2, [UnitType.Plating]: 0.5 }, // Simplifying for now
  // ... complete the cycle from spec
};

export const calculateDamage = (attackerType: UnitType, defenderType: UnitType, baseDamage: number): number => {
  const mult = multipliers[attackerType]?.[defenderType] || 1;
  return Math.floor(baseDamage * mult);
};
```

- [ ] **Step 4: Run tests (Verify success)**

- [ ] **Step 5: Commit**

```bash
git add src/logic/combat.ts src/logic/__tests__/combat.test.ts
git commit -m "feat: implement star cycle combat logic"
```

---

### Task 3: Map Generation Logic

**Files:**
- Create: `src/logic/map.ts`
- Test: `src/logic/__tests__/map.test.ts`

- [ ] **Step 1: Write map generation test**
Verify it creates a web with a boss at the end.

- [ ] **Step 2: Implement basic branching map generator**
Use a depth-based approach (layers of nodes).

- [ ] **Step 3: Commit**

---

### Task 4: Game State Hook

**Files:**
- Create: `src/hooks/useGameState.ts`

- [ ] **Step 1: Create `useGameState` with basic reducer**
Manage `squad`, `credits`, `currentPath`, `screen` (MAP, BATTLE, SHOP).

- [ ] **Step 2: Implement `recruitUnit`, `travelToNode`, `resolveBattle` actions**

- [ ] **Step 3: Commit**

---

### Task 5: Combat UI (3-Lane Siege)

**Files:**
- Create: `src/components/Combat/BattleArena.tsx`
- Create: `src/components/Combat/BattleArena.css`

- [ ] **Step 1: Implement Lane layout**
Top, Center, Bottom sectors.

- [ ] **Step 2: Implement auto-battle visualization**
Simple HP bars and damage numbers appearing.

- [ ] **Step 3: Commit**

---

### Task 6: Map UI

**Files:**
- Create: `src/components/Map/SectorMap.tsx`
- Create: `src/components/Map/SectorMap.css`

- [ ] **Step 1: Visualize nodes and connections**

- [ ] **Step 2: Handle node selection and travel**

- [ ] **Step 3: Commit**

---

### Task 7: Progression & Level Up UI

**Files:**
- Create: `src/components/Progression/LevelUp.tsx`

- [ ] **Step 1: Implement Stat boost choice (ATK vs HP)**

- [ ] **Step 2: Implement Milestone choice (Level 3/6)**

- [ ] **Step 3: Commit**

---

### Task 8: Game Loop Integration

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Connect screens based on state**
Switch between Map, Battle, Shop, and LevelUp screens.

- [ ] **Step 2: Final Polish & Verification**
Run a full "prototype" pass.

- [ ] **Step 3: Commit**
