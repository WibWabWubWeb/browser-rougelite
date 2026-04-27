# Spec: Polish & Pace Enhancements

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of full map network visibility, specialized enemy archetypes, and combat speed controls.

## 1. Overview
Enhance map navigation clarity by showing the full connection network, deepen tactical planning with single-armor enemy squads, and improve the combat experience with simulation speed controls and instant resolution.

## 2. Core Features

### 2.1 Full Map Network Visibility
- **SVG Rendering:** The `SectorMap` renders ALL connections between nodes defined in the map data.
- **Visual Styling:**
    - **Inactive Paths:** Subtle, low-contrast lines (e.g., #222) showing the full map structure.
    - **Active Paths:** High-contrast lines (e.g., #4facfe) with animated dashes connecting the `currentNode` to its neighbors.
- **Purpose:** Allows players to see long-term path branching and plan their route more effectively.

### 2.2 Specialized Enemy Archetypes
- **Constraint:** Every enemy encounter (Skirmish, Elite, Boss) must consist of units sharing a **single Armor Type**.
- **Variety:** The **Attack Type** of each unit in the squad remains randomized.
- **Intel:** The map node intel will reflect this by showing the shared Armor Type and the randomized Attack types of the squad.

### 2.3 Combat Speed & Skip Controls
- **Speed Multipliers:**
    - **1x:** Default tick rate (100ms).
    - **2x:** Fast tick rate (50ms).
    - **4x:** Ultra-fast tick rate (25ms).
- **Skip Mechanic:** 
    - A "SKIP" button that immediately resolves the battle.
    - **Implementation:** Triggers a recursive logic loop that simulates all combat ticks instantly without UI updates until `status` is 'victory' or 'defeat'.
- **UI:** A persistent control bar at the top of the `BattleArena`.

## 3. Technical Changes

### 3.1 Components
- **`SectorMap.tsx`:** Update `connections` memo to include all paths, not just current ones.
- **`BattleArena.tsx`:** 
    - Add `timeMultiplier` state.
    - Implement `handleSkip` function for instant resolution.
    - Add speed control UI.

### 3.2 Logic
- **`App.tsx`:** Update `generateEnemySquad` to accept/select a single armor type for the squad.
- **`map.ts`:** Ensure `generateMap` assigns the squad-wide armor type to battle nodes for accurate intel.

## 4. Success Criteria
- [ ] Every possible path on the map is visible.
- [ ] Enemy encounters consist of units with the same armor type.
- [ ] Players can toggle combat speed to 2x or 4x.
- [ ] Players can click "SKIP" to immediately reach the end of a battle.
