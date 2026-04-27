# Game Loop Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate all game components into `App.tsx` to create a functional playable loop from map to battle to level up.

**Architecture:** Use `useGameState` hook for central state management. Implement conditional rendering in `App.tsx` to switch between `SectorMap`, `BattleArena`, and `LevelUp`. Add missing actions to `useGameState` to handle stat upgrades and screen transitions.

**Tech Stack:** React, TypeScript, CSS (Vanilla)

---

### Task 1: Enhance `useGameState` with Level Up Actions and Initial Squad

**Files:**
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Add missing actions and initial squad**
Update `GameAction` type and `gameReducer` to handle stat choices and closing the level-up screen. Also add some starting units to the initial state.

```typescript
// src/hooks/useGameState.ts

// Add to GameAction:
// | { type: 'UPGRADE_UNIT'; unitId: string; stat: 'atk' | 'maxHp' }
// | { type: 'ADD_MILESTONE'; unitId: string; milestone: string }
// | { type: 'CLOSE_LEVEL_UP' }

// In gameReducer:
// case 'UPGRADE_UNIT':
//   return {
//     ...state,
//     squad: state.squad.map(u => u.id === action.unitId ? { 
//       ...u, 
//       atk: action.stat === 'atk' ? u.atk + 5 : u.atk,
//       maxHp: action.stat === 'maxHp' ? u.maxHp + 10 : u.maxHp,
//       hp: action.stat === 'maxHp' ? u.hp + 10 : u.hp // Heal on HP upgrade
//     } : u)
//   };
// case 'CLOSE_LEVEL_UP':
//   return { ...state, screen: 'MAP' };
```

- [ ] **Step 2: Commit changes**
```bash
git add src/hooks/useGameState.ts
git commit -m "feat: add level-up actions and initial squad to useGameState"
```

### Task 2: Update `BattleArena` to report final HP

**Files:**
- Modify: `src/components/Combat/BattleArena.tsx`

- [ ] **Step 1: Update `onBattleEnd` callback signature**
Pass the final player HPs so `App.tsx` can update the squad state.

- [ ] **Step 2: Commit changes**
```bash
git add src/components/Combat/BattleArena.tsx
git commit -m "feat: update BattleArena to report final player HPs"
```

### Task 3: Implement `App.tsx` Integration

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace boilerplate with game loop logic**
Import all components and hooks. Implement the screen switching logic. Handle enemy generation for battles.

- [ ] **Step 2: Add enemy generation utility**
Create a small helper to generate enemies based on the current level.

- [ ] **Step 3: Commit changes**
```bash
git add src/App.tsx
git commit -m "feat: integrate game loop into App.tsx"
```

### Task 4: Update `App.css` and Verification

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add basic layout styles**
Ensure the app fills the screen and has the dark sci-fi aesthetic.

- [ ] **Step 2: Final verification**
Run the app and test the full loop: Map -> Battle -> Level Up -> Map.

- [ ] **Step 3: Commit changes**
```bash
git add src/App.css
git commit -m "feat: add base styles for game loop"
```
