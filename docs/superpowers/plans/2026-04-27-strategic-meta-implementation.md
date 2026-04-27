# Strategic Meta & Squad Preparation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement starting squad drafting, connected map visuals with enemy intel, and map-based squad reordering.

**Architecture:** Extend the global state with a `DRAFT` screen and a `REORDER_SQUAD` action. Enhance the `SectorMap` with SVG connection rendering and node icons. Use a dedicated `SquadBar` component with drag-and-drop for preparation.

**Tech Stack:** React, TypeScript, Vanilla CSS, SVG.

---

### Task 1: Update State and Types for Drafting & Intel

**Files:**
- Modify: `src/types/game.ts`
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Add intelType to MapNode**
```typescript
// src/types/game.ts
export interface MapNode {
  // ... existing fields
  intelType?: UnitType; // The type of the first enemy in this node
}
```

- [ ] **Step 2: Add DRAFT screen and actions to useGameState**
```typescript
// src/hooks/useGameState.ts
export type GameScreen = 'DRAFT' | 'MAP' | 'BATTLE' | 'SHOP' | 'LEVEL_UP' | 'EVENT';

export type GameAction =
  // ... existing actions
  | { type: 'CHOOSE_SQUAD'; squad: Unit[] }
  | { type: 'REORDER_SQUAD'; squad: Unit[] };

// In gameReducer:
// case 'CHOOSE_SQUAD': return { ...state, squad: action.squad, screen: 'MAP' };
// case 'REORDER_SQUAD': return { ...state, squad: action.squad };

// Update INITIAL_STATE to start at 'DRAFT'
```

- [ ] **Step 3: Commit**
```bash
git add src/types/game.ts src/hooks/useGameState.ts
git commit -m "feat: add drafting and reordering state logic"
```

---

### Task 2: Implement Draft Screen

**Files:**
- Create: `src/components/Draft/DraftScreen.tsx`
- Create: `src/components/Draft/DraftScreen.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create DraftScreen component**
Generate 3 random squads. Show types. Add "Intel" cards on hover/click.

- [ ] **Step 2: Integrate into App.tsx**
Render `DraftScreen` when `state.screen === 'DRAFT'`.

- [ ] **Step 3: Write tests for drafting**
Verify 3 options are shown and selection transitions to MAP.

- [ ] **Step 4: Commit**
```bash
git add src/components/Draft/ src/App.tsx
git commit -m "feat: implement starting squad draft screen"
```

---

### Task 3: Map Intel and Connected Visuals

**Files:**
- Modify: `src/logic/map.ts`
- Modify: `src/components/Map/SectorMap.tsx`
- Modify: `src/components/Map/SectorMap.css`

- [ ] **Step 1: Assign intelType during map generation**
In `src/logic/map.ts`, assign a random `UnitType` to `intelType` for all battle-related nodes.

- [ ] **Step 2: Update SectorMap to render intel icons and SVG connections**
Use the `intelType` to show an icon on the node. Ensure SVG lines highlight paths from the current node to reachable nodes.

- [ ] **Step 3: Commit**
```bash
git add src/logic/map.ts src/components/Map/SectorMap.tsx src/components/Map/SectorMap.css
git commit -m "feat: add SVG connections and enemy intel to SectorMap"
```

---

### Task 4: Squad Reordering (SquadBar)

**Files:**
- Create: `src/components/Map/SquadBar.tsx`
- Create: `src/components/Map/SquadBar.css`
- Modify: `src/components/Map/SectorMap.tsx`

- [ ] **Step 1: Create SquadBar with Drag & Drop**
Implement a horizontal bar where units can be reordered. Call `onReorder` (which dispatches `REORDER_SQUAD`) when the order changes.

- [ ] **Step 2: Integrate SquadBar into SectorMap**
Place the `SquadBar` at the bottom of the Map screen.

- [ ] **Step 3: Write tests for reordering**
Verify that dragging a unit updates its position in the squad array.

- [ ] **Step 4: Commit**
```bash
git add src/components/Map/SquadBar.tsx src/components/Map/SquadBar.css src/components/Map/SectorMap.tsx
git commit -m "feat: implement squad reordering on map screen"
```
