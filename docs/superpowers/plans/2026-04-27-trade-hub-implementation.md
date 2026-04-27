# Trade Hub & Inventory System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a shop interface, consumable inventory, module equipment, and unit recruitment.

**Architecture:** Extend global state to support an `inventory` array and complex purchasing actions (`BUY_ITEM`, `USE_ITEM`, `EQUIP_MODULE`, `RECRUIT_SWAP`). Build a full-screen `ShopScreen` for purchases and integrate an `InventoryPanel` into the `SectorMap` for usage.

**Tech Stack:** React, TypeScript, Vitest, Vanilla CSS.

---

### Task 1: Data Model and State Actions

**Files:**
- Modify: `src/types/game.ts`
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Define Item types in game.ts**
```typescript
// src/types/game.ts
export type ItemCategory = 'consumable' | 'module';

export interface ShopItem {
  id: string;
  name: string;
  category: ItemCategory;
  cost: number;
  description: string;
  effect: {
    heal?: number;
    maxHp?: number;
    atk?: number;
    speed?: number;
  };
}
```

- [ ] **Step 2: Update GameState and actions in useGameState.ts**
Add `inventory: ShopItem[]` to `GameState` and `INITIAL_STATE`. Add `BUY_ITEM`, `USE_ITEM`, `EQUIP_MODULE` to `GameAction`. Update `RECRUIT` to accept a `replaceIndex` to handle swapping.

- [ ] **Step 3: Implement reducers**
Implement the state changes for buying (deduct credits, add to inventory), using items (remove from inventory, apply heal), equipping modules (apply stats permanently), and recruiting (splice the new unit into the specific index, replacing the old one).

- [ ] **Step 4: Commit**
```bash
git add src/types/game.ts src/hooks/useGameState.ts
git commit -m "feat: add inventory state and shop actions to data model"
```

---

### Task 2: Reusable Selection Modal

**Files:**
- Create: `src/components/Shared/TargetSelectionModal.tsx`
- Create: `src/components/Shared/TargetSelectionModal.css`

- [ ] **Step 1: Create the Modal component**
Create a modal that displays the current 3-unit squad and allows the player to select one. It should accept `title`, `squad`, `onSelect(unitId)`, and `onCancel()`.

- [ ] **Step 2: Commit**
```bash
git add src/components/Shared/
git commit -m "feat: create reusable TargetSelectionModal component"
```

---

### Task 3: The Shop Screen

**Files:**
- Create: `src/components/Shop/ShopScreen.tsx`
- Create: `src/components/Shop/ShopScreen.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create ShopScreen UI**
Implement the 3-column layout (Consumables, Modules, Recruits).
Add logic to randomly generate a few items in each category on mount.

- [ ] **Step 2: Implement Purchasing Logic**
Use the `TargetSelectionModal` when buying a Module (to select who equips it) or a Recruit (to select who is replaced). Buying consumables just calls `buyItem(item)`.

- [ ] **Step 3: Integrate into App.tsx**
Render `ShopScreen` when `state.screen === 'SHOP'`. Pass the necessary actions from `useGameState` (e.g., `buyItem`, `equipModule`, `recruitSwap`).

- [ ] **Step 4: Commit**
```bash
git add src/components/Shop/ src/App.tsx
git commit -m "feat: implement full-screen Trade Hub dashboard"
```

---

### Task 4: Map Inventory Overlay

**Files:**
- Create: `src/components/Map/InventoryPanel.tsx`
- Create: `src/components/Map/InventoryPanel.css`
- Modify: `src/components/Map/SectorMap.tsx`

- [ ] **Step 1: Create InventoryPanel**
A collapsible panel showing the current `inventory` (filtered to consumables). Clicking an item should open the `TargetSelectionModal` to choose who to heal.

- [ ] **Step 2: Integrate into SectorMap**
Render the `InventoryPanel` on the map screen, accessible via a button. Pass the `useItem` action.

- [ ] **Step 3: Commit**
```bash
git add src/components/Map/
git commit -m "feat: add map inventory overlay for consumables"
```

---

### Task 5: Testing and Verification

**Files:**
- Modify: `src/hooks/__tests__/useGameState.test.ts`
- Create: `src/components/Shop/__tests__/ShopScreen.test.tsx`

- [ ] **Step 1: Write State Tests**
Verify `BUY_ITEM`, `USE_ITEM`, `EQUIP_MODULE`, and the updated `RECRUIT` (swap) logic in `useGameState.test.ts`.

- [ ] **Step 2: Run all tests**
Run: `npm test -- --run`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add src/hooks/__tests__/useGameState.test.ts src/components/Shop/__tests__/ShopScreen.test.tsx
git commit -m "test: add tests for shop and inventory mechanics"
```
