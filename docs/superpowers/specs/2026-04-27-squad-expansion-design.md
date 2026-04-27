# Spec: Squad Expansion & Health Monitoring

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Increasing squad capacity to 6 units and implementing HP visibility on the map.

## 1. Overview
Increase the maximum squad size from 3 to 6 units to support longer runs and deeper strategy. Enhance the Map UI to display the current health of all squad members, allowing for better survival planning.

## 2. Core Features

### 2.1 Expanded Squad Capacity
- **Max Limit:** The `squad` array can now contain up to 6 units.
- **Starting State:** The game still starts with 3 units from the initial draft.
- **Recruitment Logic:** 
    - When buying a unit in the Trade Hub, it is **Added** if `squad.length < 6`.
    - If `squad.length === 6`, the player must choose a unit to **Replace**.

### 2.2 Map HP Visibility
- **Health Bars:** Every card in the `SquadBar` component will render a miniature health bar under the unit's name.
- **Stats:** Show numeric current HP and max HP (e.g., `42/50`).
- **Visual Cues:** HP bars should transition from Green to Red as health decreases.

### 2.3 UI Design (`SquadBar.tsx`)
- **6-Slot Layout:** A horizontal bar with 6 equal-sized slots.
- **Empty Slots:** Render dimmed placeholders (e.g., "Empty Slot [4-6]") for slots not yet filled.
- **Responsive Sizing:** Adjust card widths in `SquadBar.css` to ensure all 6 units fit within the viewport without horizontal scrolling if possible.

## 3. Technical Changes

### 3.1 State Management (`useGameState.ts`)
- **Action Update:** Modify the `RECRUIT` reducer logic. 
    - Check current squad length.
    - If `< 6`, append the new unit.
    - If `=== 6`, use the `replaceIndex` (provided by the shop interaction) to swap.

### 3.2 Logic
- **Combat Loop:** Ensure the 1v1 gauntlet correctly iterates through all available units (up to 6) in the player's squad.

### 3.3 Components
- **`SquadBar.tsx`:** 
    - Update to render 6 slots (filling with units or placeholders).
    - Add the HP bar and stats rendering.
- **`InventoryPanel.tsx`:** Ensure target selection works across the full 6-unit squad.
- **`TargetSelectionModal.tsx`:** Update layout to handle up to 6 units for selection.

## 4. Success Criteria
- [ ] Squad can grow up to 6 units through recruitment.
- [ ] Map screen clearly shows the current HP of every unit.
- [ ] The `SquadBar` displays placeholders for empty slots.
- [ ] Combat correctly processes up to 6 units in the relay gauntlet.
