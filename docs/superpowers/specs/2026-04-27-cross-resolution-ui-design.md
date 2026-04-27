# Spec: Dynamic Cross-Resolution UI

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of media queries and responsive scaling for small and large resolutions.

## 1. Overview
The UI currently lacks the flexibility to handle high-resolution dead space and low-resolution overflow simultaneously. We will implement a "Smart Stacking" system that reconfigures the UI based on available viewport width, ensuring a "neat" appearance on all devices.

## 2. Responsive Breakpoints

### 2.1 Large Screens (> 1400px)
- **Sector Map:** Wide gaps (`8vw`), large nodes (`80px`), horizontally centered.
- **Squad Bar:** Single horizontal row of 6 units, stretching up to `1800px`.

### 2.2 Medium/Small Screens (< 1400px)
- **Sector Map:** 
    - Reduce column gap to `4vw`.
    - Reduce node gap to `2vh`.
    - Enable horizontal touch-scrolling for the map network.
- **Squad Bar:** 
    - Switch from a single row to a **two-row grid (3x2)**.
    - Reduce card padding and icon sizes.
- **Inventory/Graph:** Position as overlays that don't obscure the core node network.

## 3. Technical Changes

### 3.1 Components
- **`SquadBar.tsx` / `SquadBar.css`:** Implement media query `@media (max-width: 1400px)` to trigger grid layout.
- **`SectorMap.tsx` / `SectorMap.css`:** Refine `clamp()` values and container padding to prevent map-edge truncation.
- **`App.css`:** Adjust `.game-container` padding for smaller screens.

### 3.2 Testing
- Verify that the squad bar correctly switches between row and grid at the 1400px threshold.
- Ensure all 6 units are clickable and draggable in both layouts.

## 4. Success Criteria
- [ ] UI looks "Full" and balanced on a 2K display.
- [ ] UI is fully contained (no horizontal body scroll) on a 1080p laptop display.
- [ ] Squad Bar is readable and interactive in both horizontal and grid modes.
- [ ] Map remains the primary focus across all sizes.
