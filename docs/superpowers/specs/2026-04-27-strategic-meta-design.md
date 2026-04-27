# Spec: Strategic Meta & Squad Preparation

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of starting squad drafting, connected map visuals, and map-based squad reordering.

## 1. Overview
Enhance the strategic layer of the game by allowing players to draft their starting team and prepare for battles by reordering their squad on the map screen based on visible enemy intel.

## 2. Core Features

### 2.1 Starting Squad Draft
- **Draft Screen:** A new game state/screen that appears before the Map.
- **Randomized Options:** Generates 3 distinct squads, each containing 3 random units.
- **Unit Intel:** 
    - Display large icons for the `UnitType` of each squad member.
    - Interactive hover/click reveals a detailed "Intel Card" showing HP, ATK, and SPEED.
- **Selection:** Once a squad is chosen, it is set as the `squad` in the global state, and the game proceeds to the Map.

### 2.2 Connected Sector Map
- **SVG Connections:** Render lines between nodes based on the `MapNode.connections` array.
- **Path Highlighting:** Lines connecting the `currentNodeId` to its neighbors are styled as "Active" (e.g., animated dashes).
- **Enemy Intel:** 
    - Battle nodes (Skirmish, Elite, Boss) display the `UnitType` icon of the first enemy in that encounter.
    - This allows players to see what they will face before traveling.

### 2.3 Squad Reordering (Drag & Drop)
- **Map Squad Bar:** A UI component at the bottom of the `SectorMap` screen showing current squad members.
- **Interaction:** Players can drag and drop units within this bar to change their order.
- **Strategic Impact:** The unit at the first position in the bar will be the first to enter the 1v1 gauntlet in the next battle.

## 3. Technical Changes

### 3.1 State Management (`useGameState.ts`)
- **New Screen:** Add `DRAFT` to `GameScreen` type.
- **New Action:** `CHOOSE_SQUAD` to set the starting units and transition to `MAP`.
- **New Action:** `REORDER_SQUAD` to update the indices of units in the `squad` array.

### 3.2 Components
- **`DraftScreen.tsx`:** New component for the starting selection.
- **`SectorMap.tsx`:** 
    - Update to render SVG lines.
    - Update node rendering to include enemy type icons.
    - Integrate the `SquadBar` component.
- **`SquadBar.tsx`:** New component for map-based reordering.

### 3.3 Logic (`logic/map.ts`)
- Update node generation to assign an "Intel Type" (the type of the first enemy) to each battle node during map creation.

## 4. Success Criteria
- [ ] Player can choose between 3 squads at the start of the game.
- [ ] Map nodes show connections that match the navigation logic.
- [ ] Battle nodes show the correct type icon for the enemy they contain.
- [ ] Player can drag units on the map screen to change their combat order.
