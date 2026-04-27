# Spec: Star Cycle Info Graph

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of a visual reference for unit type strengths and weaknesses (The Star Cycle).

## 1. Overview
Add a visual circular diagram to the `SectorMap` screen that explains the "Star Cycle" (Thermal > Plating/Bio, Ion > Shields, Toxic > Bio, etc.). This ensures players have a clear reference while reordering their squad to counter visible enemy types on the map.

## 2. Design & Placement

### 2.1 The Circular Diagram
- **Visual Style:** A circular flow chart using SVG.
- **Content:**
    - **Types:** Thermal, Ion, Toxic, Plating, Shields, Bio.
    - **Arrows:** Distinct arrows showing counter relationships (e.g., Thermal points to Plating and Bio).
    - **Legends:** 2x damage (Strength) and 0.5x damage (Weakness) clearly color-coded (Green for strong, Red for weak).
- **Icons:** Use the same icons established for the map and squad bar (🔥, ⚡, ☣️, etc.).

### 2.2 Screen Integration
- **Placement:** Integrated into the `SectorMap` component.
- **Location:** positioned near the `SquadBar` at the bottom of the screen (e.g., bottom-left or bottom-right corner).
- **Visibility:** Always visible on the map screen, but slightly transparent or collapsible if it obscures map nodes.

## 3. Technical Changes

### 3.1 Components
- **`StarCycleGraph.tsx`:** A new functional component that renders the SVG diagram.
- **Props:** Accepts no props (static reference) or potentially highlights a specific type if a unit is being dragged.

### 3.2 Logic
- **Consistency:** Ensure the diagram perfectly matches the logic implemented in `src/logic/combat.ts`.

## 4. Success Criteria
- [ ] A clear, readable circular diagram is visible on the `SectorMap` screen.
- [ ] The diagram accurately reflects the combat effectiveness matrix.
- [ ] The diagram helps the player make informed decisions during squad reordering.
