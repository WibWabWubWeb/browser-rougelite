# Adaptive Responsive Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the UI into a fluid, centered, and scalable layout that looks "neat" on everything from 1080p to 2K displays.

**Architecture:** Refactor CSS to use `clamp()` and Viewport Units (`vw`, `vh`) for spacing and sizing. Centralize the layout logic in `App.css` and ensure `SectorMap` and `SquadBar` adapt to the centered content area.

**Tech Stack:** React, TypeScript, CSS.

---

### Task 1: Standardize Global Centering

**Files:**
- Modify: `src/App.css`
- Modify: `src/index.css`

- [ ] **Step 1: Update index.css for full-screen baseline**
Ensure the body and root allow for centered content without scrollbars unless necessary.

- [ ] **Step 2: Update App.css centering logic**
Refactor `.game-container` to use `align-items: center` and a `max-width: 1800px`.

```css
/* src/App.css */
.game-container {
  flex: 1;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto; /* Center the entire app content */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
}
```

- [ ] **Step 3: Commit**
```bash
git add src/App.css src/index.css
git commit -m "style: implement global centering and content area max-width"
```

---

### Task 2: Fluid Sector Map Refactor

**Files:**
- Modify: `src/components/Map/SectorMap.tsx`
- Modify: `src/components/Map/SectorMap.css`

- [ ] **Step 1: Implement fluid spacing and sizing**
Replace fixed pixel gaps with `clamp()` and `vw` units.

```css
/* src/components/Map/SectorMap.css */
.sector-map-container {
  justify-content: center; /* Center nodes in the 2K space */
  gap: clamp(60px, 8vw, 180px); /* Responsive column spacing */
}

.map-column {
  gap: clamp(30px, 5vh, 100px); /* Responsive node spacing */
}

.node {
  width: clamp(55px, 5vw, 85px);
  height: clamp(55px, 5vw, 85px);
  font-size: clamp(1.2rem, 2vw, 1.8rem);
}
```

- [ ] **Step 2: Update connection line rendering**
Ensure `ConnectionLine` (in `SectorMap.tsx`) still calculates relative to the centered container. (The existing `getBoundingClientRect` logic should handle this, but verify resize events).

- [ ] **Step 3: Commit**
```bash
git add src/components/Map/SectorMap.tsx src/components/Map/SectorMap.css
git commit -m "style: refactor SectorMap with fluid gaps and centered nodes"
```

---

### Task 3: Expansive Squad Bar Scaling

**Files:**
- Modify: `src/components/Map/SquadBar.css`

- [ ] **Step 1: Scale squad cards and HP bars**
Increase the prominence of units on high-res screens.

```css
/* src/components/Map/SquadBar.css */
.squad-unit-card, .empty-slot {
  width: clamp(160px, 15vw, 240px);
  padding: clamp(8px, 1vh, 15px);
}

.unit-hp-bar {
  height: 6px; /* Thicker bar */
}

.unit-hp-text {
  font-size: 0.7rem; /* Larger health numbers */
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/Map/SquadBar.css
git commit -m "style: enhance SquadBar scaling for high resolutions"
```

---

### Task 4: Final Verification

- [ ] **Step 1: Manual Visual Check**
Verify the map is centered on 2K. Resize window to 1080p and confirm it's still neat and nodes aren't overlapping.

- [ ] **Step 2: Run all tests**
Run: `npm test -- --run`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git commit --allow-empty -m "chore: verify adaptive layout across resolutions"
```
