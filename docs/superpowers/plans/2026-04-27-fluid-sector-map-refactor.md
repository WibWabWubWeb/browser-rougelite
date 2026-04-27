# Fluid Sector Map Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the SectorMap component and styles to use fluid spacing and centered nodes, ensuring the map spreads out elegantly on 2K displays.

**Architecture:** Switch `.sector-map-container` to use `justify-content: center` and replace fixed pixel values with `clamp()` and viewport units for gaps and node sizes.

**Tech Stack:** React, CSS (Vanilla), Vitest, React Testing Library.

---

### Task 1: Update SectorMap Styles

**Files:**
- Modify: `src/components/Map/SectorMap.css`

- [ ] **Step 1: Update container styles**

Modify `.sector-map-container` to center content and use fluid gap.

```css
.sector-map-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #0a0a0c;
  padding: 40px;
  padding-bottom: 120px; /* Space for SquadBar */
  position: relative;
  display: flex;
  gap: clamp(60px, 8vw, 150px); /* Fluid column gap */
  align-items: center;
  justify-content: center; /* Center the node network */
  min-height: 0; /* Allow flex shrink */
  flex: 1;
}
```

- [ ] **Step 2: Update column styles**

Modify `.map-column` to use fluid gap between nodes.

```css
.map-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(30px, 4vh, 80px); /* Fluid node gap */
  position: relative;
  z-index: 1;
  min-width: 60px;
}
```

- [ ] **Step 3: Update node styles**

Modify `.node` to use fluid sizing and proportional font size.

```css
.node {
  width: clamp(55px, 5vw, 85px); /* Fluid width */
  height: clamp(55px, 5vw, 85px); /* Fluid height */
  border-radius: 50%;
  background: #1a1a20;
  border: 2px solid #3a3a45;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: all 0.2s ease;
  position: relative;
  color: #fff;
  font-size: clamp(1.2rem, 1.5vw, 2rem); /* Fluid font size */
  user-select: none;
}
```

- [ ] **Step 4: Update connections overlay**

Ensure `connections-overlay` covers the entire scrollable area if needed, though `getBoundingClientRect` usually handles it if the SVG is relative to the container.

```css
.connections-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Use width instead of min-width if centered */
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}
```

- [ ] **Step 5: Commit styles**

```bash
git add src/components/Map/SectorMap.css
git commit -m "style: refactor SectorMap with fluid gaps and centered nodes"
```

### Task 2: Verify and Adjust SectorMap Logic

**Files:**
- Modify: `src/components/Map/SectorMap.tsx`

- [ ] **Step 1: Verify ConnectionLine logic**

The current `getBoundingClientRect` approach in `ConnectionLine` should already work with centered containers because it calculates relative to the container's `getBoundingClientRect`. However, if the map exceeds the container and scrolls, `scrollLeft`/`scrollTop` are already included.

Ensure `ConnectionLine` handles window resizing (it already has a listener).

- [ ] **Step 2: Add a test case for fluid scaling in SectorMap.test.tsx**

Verify that the component still renders correctly and interactions work.

```typescript
test('renders with fluid styles (visual check via classes)', () => {
  const { container } = render(
    <SectorMap 
      map={mockMap} 
      currentNodeId="1" 
      currentLevel={0} 
      onTravel={() => {}} 
      squad={[]}
      onReorder={() => {}}
      inventory={[]}
      useItem={() => {}}
    />
  );
  
  const containerEl = container.querySelector('.sector-map-container');
  expect(containerEl).toHaveStyle('justify-content: center');
});
```

- [ ] **Step 3: Run tests**

Run: `npm test src/components/Map/__tests__/SectorMap.test.tsx`
Expected: PASS

- [ ] **Step 4: Commit verification**

```bash
git add src/components/Map/SectorMap.tsx src/components/Map/__tests__/SectorMap.test.tsx
git commit -m "test: verify SectorMap functionality after fluid refactor"
```
