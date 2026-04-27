# Decoupled Combat Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot from a 6-way unit loop to a decoupled system with 3 Attack types (Thermal, Ion, Toxic) and 3 Armor types (Plating, Shields, Bio).

**Architecture:** Split the `UnitType` enum into `AttackType` and `ArmorType`. Refactor `calculateDamage` to use a 3x3 lookup table. Update all unit generation (draft, enemy, logic) and UI components to handle the dual-type system.

**Tech Stack:** React, TypeScript, Vitest, Vanilla CSS, SVG.

---

### Task 0: Preliminary Cleanup
**Files:**
- Modify: All currently modified files in the workspace.

- [ ] **Step 1: Commit existing layout and balance fixes**
Before pivoting the entire type system, ensure the recent layout fixes and the temporary symmetric balance are saved.

Run: `git add . && git commit -m "checkpoint: responsive layout and stable reordering fixed"`
Expected: Success

---

### Task 1: Update Data Model and Types

**Files:**
- Modify: `src/types/game.ts`
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Define AttackType and ArmorType**
Replace the old `UnitType` with two distinct categories.

```typescript
// src/types/game.ts
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
  // ... existing fields
  atkType: AttackType;
  defType: ArmorType;
  // REMOVE: type: UnitType;
}

export interface MapNode {
  // ...
  intelAtkType?: AttackType;
  intelDefType?: ArmorType;
}
```

- [ ] **Step 2: Commit**
```bash
git add src/types/game.ts
git commit -m "feat: define decoupled Attack and Armor types"
```

---

### Task 2: Refactor Combat Logic and Tests

**Files:**
- Modify: `src/logic/combat.ts`
- Modify: `src/logic/__tests__/combat.test.ts`

- [ ] **Step 1: Update calculateDamage for 3x3 Grid**
Implement the matrix: Thermal > Plating, Ion > Shields, Toxic > Bio.

- [ ] **Step 2: Update combat tests**
Verify all 9 combinations (3x Strong, 3x Weak, 3x Neutral).

- [ ] **Step 3: Commit**
```bash
git add src/logic/combat.ts src/logic/__tests__/combat.test.ts
git commit -m "feat: implement 3x3 interaction matrix in combat logic"
```

---

### Task 3: Update Unit Generation (Draft & Enemies)

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Draft/DraftScreen.tsx`
- Modify: `src/logic/map.ts`

- [ ] **Step 1: Update DraftScreen generator**
Randomly assign both an `AttackType` and an `ArmorType` to units.

- [ ] **Step 2: Update App.tsx enemy generation**
Assign dual types to enemies.

- [ ] **Step 3: Update map.ts intel assignment**
Populate `intelAtkType` and `intelDefType` for battle nodes.

- [ ] **Step 4: Commit**
```bash
git add src/App.tsx src/components/Draft/DraftScreen.tsx src/logic/map.ts
git commit -m "feat: update unit generation for dual types"
```

---

### Task 4: Refactor UI (Cards, Graph, Intel)

**Files:**
- Modify: `src/components/Map/StarCycleGraph.tsx`
- Modify: `src/components/Map/SquadBar.tsx`
- Modify: `src/components/Combat/BattleArena.tsx`
- Modify: `src/components/Map/SectorMap.tsx`

- [ ] **Step 1: Redesign StarCycleGraph**
Refactor SVG to show 3 ATK types on the left and 3 DEF types on the right with connection lines, or a 3x3 grid visualization.

- [ ] **Step 2: Update Unit display in all components**
Show dual icons (e.g., [🔥/🛡️]) on unit cards.

- [ ] **Step 3: Commit**
```bash
git add src/components/
git commit -m "feat: refactor UI to display dual unit types"
```

---

### Task 5: Final Verification

- [ ] **Step 1: Run all tests**
Run: `npm test -- --run`
Expected: PASS

- [ ] **Step 2: Manual Check**
Verify drafting works, map intel shows both types, and combat damage is correct.
