# Spec: Adaptive Responsive Layout

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of a fluid, centered, and scalable layout for all screen resolutions (1080p to 2K+).

## 1. Overview
The current layout is fixed-width and left-aligned, leading to excessive dead space on high-resolution monitors. We will pivot to a fluid, centered architecture using Viewport Units (vw, vh) and `clamp()` to ensure a consistent, "neat" look across all devices.

## 2. UI Refinements

### 2.1 Centered Sector Map
- **Layout:** Switch `justify-content: flex-start` to `center` in the `SectorMap` container.
- **Fluid Spacing:** 
    - Columns: `gap: clamp(60px, 8vw, 150px)`.
    - Nodes: `gap: clamp(30px, 4vh, 80px)`.
- **Node Scaling:** Use `clamp()` for node circles: `width: clamp(50px, 5vw, 75px); height: same;`.
- **SVG Connections:** Ensure `ConnectionLine` coordinates are recalculated correctly on window resize.

### 2.2 Rebalanced Squad Bar
- **Width:** Use `width: 100%; max-width: 1800px;` to ensure it doesn't stretch infinitely on ultra-wide screens but fills the 2K area comfortably.
- **Card Scaling:** Increase squad card size slightly on larger screens: `min-width: clamp(120px, 12vw, 200px);`.
- **Typography:** Increase font sizes for unit names and HP displays to maintain legibility.

### 2.3 Global Immersive Theme
- **Header:** Align Credits and Depth to the inner content edges of the 1800px max-width container.
- **Full Viewport:** Ensure all screens (BATTLE, SHOP, DRAFT) use the same centered, fluid grid logic.

## 3. Technical Changes

### 3.1 Components
- **`SectorMap.tsx` / `SectorMap.css`:** Refactor positioning and gaps.
- **`SquadBar.tsx` / `SquadBar.css`:** Update card sizing and health bar prominence.
- **`App.tsx` / `App.css`:** Standardize the `.game-container` centering logic.

### 3.2 Testing
- Verify that navigation remains functional after resizing the window.
- Ensure SVG connection lines don't drift after layout shifts.

## 4. Success Criteria
- [ ] Map is horizontally centered on all resolutions.
- [ ] The game utilizes the full width of a 2K display without being "stretched".
- [ ] The game remains fully usable and balanced on a standard 1080p screen.
- [ ] UI elements (nodes, bars, cards) scale proportionally with the viewport.
