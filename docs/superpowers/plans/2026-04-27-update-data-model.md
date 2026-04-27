# Update Data Model and Types Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old `UnitType` with decoupled `AttackType` and `ArmorType` enums and update unit/node interfaces.

**Architecture:** Split the monolithic `UnitType` into two separate enums: `AttackType` (offensive) and `ArmorType` (defensive). Update the `Unit` and `MapNode` interfaces to use these new types. Fix all cascading type errors in the logic, components, and tests to ensure a clean build.

**Tech Stack:** TypeScript, Vitest.

---

### Task 1: Update Types and Interfaces

**Files:**
- Modify: `src/types/game.ts`

- [ ] **Step 1: Replace UnitType with AttackType and ArmorType**

```typescript
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

export interface MapNode {
  id: string;
  type: NodeType;
  connections: string[];
  depth: number;
  intelAtkType?: AttackType;
  intelDefType?: ArmorType;
}
```

- [ ] **Step 2: Verify with tsc (it will fail)**
Run: `npm run build`
Expected: FAIL with many errors related to missing `UnitType`.

---

### Task 2: Fix Logic and Hooks

**Files:**
- Modify: `src/logic/map.ts`
- Modify: `src/logic/combat.ts`
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Update map generation logic**
Modify `src/logic/map.ts` to assign both `intelAtkType` and `intelDefType`.

- [ ] **Step 2: Update combat logic (minimally)**
Modify `src/logic/combat.ts` to accept `AttackType` and `ArmorType`.

- [ ] **Step 3: Fix hook type errors**
Ensure `src/hooks/useGameState.ts` builds correctly.

---

### Task 3: Fix Component Type Errors

**Files:**
- Modify: `src/components/Draft/DraftScreen.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Map/SectorMap.tsx`
- Modify: `src/components/Map/SquadBar.tsx`
- Modify: `src/components/Combat/BattleArena.tsx`
- Modify: `src/components/Progression/LevelUp.tsx`

- [ ] **Step 1: Fix DraftScreen**
Update unit generation to assign random `atkType` and `defType`.

- [ ] **Step 2: Fix other components**
Update all components that referenced `unit.type` or `node.intelType`.

---

### Task 4: Fix Tests and Verify Build

**Files:**
- Modify: `src/hooks/__tests__/useGameState.test.ts`
- Modify: `src/logic/__tests__/map.test.ts`
- Modify: `src/logic/__tests__/combat.test.ts`

- [ ] **Step 1: Update tests**
Fix all test data and assertions to use `atkType` and `defType`.

- [ ] **Step 2: Final Verification**
Run: `npm test -- --run`
Run: `npm run build`
Expected: ALL PASS

- [ ] **Step 3: Commit**
Run: `git add . && git commit -m "feat: define decoupled Attack and Armor types"`
