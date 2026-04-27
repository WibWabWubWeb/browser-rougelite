# Initiative 1v1 Combat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot the combat system from 3-lane siege to an initiative-based 1v1 squad gauntlet.

**Architecture:** Update the data model to include a `speed` stat. Refactor the `BattleArena` to manage a real-time ATB (Active Time Bar) loop where units attack when their bar fills. Remove hubs and lane logic.

**Tech Stack:** React, TypeScript, Vitest, Vanilla CSS.

---

### Task 0: Cleanup and Checkpoint

**Files:**
- Modify: All currently modified files in the workspace.

- [ ] **Step 1: Commit current working prototype state**
Ensure all existing work on the lane-based prototype is saved before we pivot.

Run: `git add . && git commit -m "checkpoint: functional lane-based prototype before 1v1 pivot"`
Expected: Success

---

### Task 1: Update Data Model and Mock Data

**Files:**
- Modify: `src/types/game.ts`
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Add speed to Unit interface**

```typescript
// src/types/game.ts
export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  hp: number;
  maxHp: number;
  atk: number;
  speed: number; // Add this
  level: number;
  xp: number;
  xpToNext: number;
  milestones: string[];
}
```

- [ ] **Step 2: Update INITIAL_SQUAD and unit generation with speed**
Update `INITIAL_SQUAD` in `src/hooks/useGameState.ts`.

```typescript
// src/hooks/useGameState.ts
const INITIAL_SQUAD: Unit[] = [
  { id: 'p1', name: 'Interceptor', type: UnitType.Thermal, hp: 40, maxHp: 40, atk: 10, speed: 15, level: 1, xp: 0, xpToNext: 20, milestones: [] },
  // ... update p2 (speed: 5), p3 (speed: 10)
];
```

- [ ] **Step 3: Update App.tsx enemy generation**
Update `generateEnemySquad` in `src/App.tsx`.

```typescript
// src/App.tsx
const generateEnemySquad = (level: number): Unit[] => {
  // ...
  return Array.from({ length: 3 }).map((_, i) => ({
    // ...
    speed: 8 + level,
    // ...
  }));
};
```

- [ ] **Step 4: Commit**
```bash
git add src/types/game.ts src/hooks/useGameState.ts src/App.tsx
git commit -m "feat: add speed stat to units"
```

---

### Task 2: Implement 1v1 ATB Combat Logic

**Files:**
- Modify: `src/components/Combat/BattleArena.tsx`
- Modify: `src/components/Combat/BattleArena.css`

- [ ] **Step 1: Refactor BattleState and Effect Loop**
Remove lane HPs and Hub HPs. Add `atb` state.

```tsx
// src/components/Combat/BattleArena.tsx
interface BattleState {
  playerActiveIndex: number;
  enemyActiveIndex: number;
  playerHPs: number[];
  enemyHPs: number[];
  playerATB: number;
  enemyATB: number;
  status: 'idle' | 'fighting' | 'victory' | 'defeat';
  log: string[];
}

// Logic:
// 1. Tick every 100ms.
// 2. Increase ATB: atb += speed * 0.5;
// 3. If playerATB >= 100: attack enemy, reset to 0.
// 4. If enemy HP <= 0: increment enemyActiveIndex. If out of enemies: victory.
```

- [ ] **Step 2: Update UI for 1v1 Stage**
Center the two active units. Show their ATB bars. Show the "bench" units behind them.

- [ ] **Step 3: Update CSS for 1v1 Stage**
Replace lane styles with a duel stage layout.

- [ ] **Step 4: Commit**
```bash
git add src/components/Combat/BattleArena.tsx src/components/Combat/BattleArena.css
git commit -m "feat: implement 1v1 ATB combat UI and logic"
```

---

### Task 3: Update Battle Resolution

**Files:**
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Update RESOLVE_BATTLE action**
The battle result should now reflect which units were actually lost in the 1v1 gauntlet.

- [ ] **Step 2: Commit**
```bash
git add src/hooks/useGameState.ts
git commit -m "feat: update battle resolution for squad-wipe conditions"
```

---

### Task 4: Fix Tests

**Files:**
- Modify: `src/components/Combat/__tests__/BattleArena.test.tsx`
- Modify: `src/hooks/__tests__/useGameState.test.ts`

- [ ] **Step 1: Update BattleArena tests**
Verify that combat proceeds in 1v1 order and that ATB progresses.

- [ ] **Step 2: Run all tests**
Run: `npm test -- --run`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add src/components/Combat/__tests__/BattleArena.test.tsx src/hooks/__tests__/useGameState.test.ts
git commit -m "test: update tests for 1v1 combat system"
```
