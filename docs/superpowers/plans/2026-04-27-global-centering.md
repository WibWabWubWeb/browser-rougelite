# Global Centering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the global CSS baseline and App layout to support centered content with a maximum width of 1800px.

**Architecture:** Update `index.css` to establish a flexible root layout and `App.css` to constrain the game container's width while centering it.

**Tech Stack:** CSS, React (Vite/TypeScript)

---

### Task 1: Refactor Global CSS (index.css)

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update index.css for flexible layout**

```css
:root {
  --text: #e0e0e0;
  --text-h: #00ffcc;
  --bg: #0a0a12;
  --border: #1a3a5a;
  --accent: #00ffcc;
  
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color-scheme: dark;
  color: var(--text);
  background: var(--bg);
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scroll */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#root {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

* {
  box-sizing: border-box;
}
```

- [ ] **Step 2: Commit global CSS changes**

```bash
git add src/index.css
git commit -m "style: update index.css for flexible global layout"
```

---

### Task 2: Refactor App CSS (App.css)

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Update App.css with max-width and centering**

```css
.star-commander-app {
  width: 100%;
  min-height: 100vh;
  background-color: #0a0a12;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
}

.game-container {
  flex: 1;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden; /* Children handle scrolling */
  box-sizing: border-box;
}

.game-container.centered {
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* ... existing styles ... */
```

- [ ] **Step 2: Ensure consistency across screens in App.tsx**

Check `src/App.tsx` and ensure all screens that should be centered have the correct classes. (Actually, `App.tsx` already uses `.game-container`).

- [ ] **Step 3: Run existing tests to ensure no regressions**

Run: `npm test -- --run`
Expected: ALL PASS

- [ ] **Step 4: Commit App CSS changes**

```bash
git add src/App.css
git commit -m "style: implement global centering and content area max-width"
```

---

### Task 3: Final Verification

- [ ] **Step 1: Verify all tests pass**

Run: `npm test -- --run`
Expected: ALL PASS

- [ ] **Step 2: Final commit if any small adjustments were made**

(If needed)
