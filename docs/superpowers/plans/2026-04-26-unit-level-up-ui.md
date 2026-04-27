# Progression & Level Up UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the `LevelUp` interface where players choose rewards for their units after a battle.

**Architecture:** A functional React component using Vanilla CSS for styling. It will take a list of units that leveled up and callbacks for selecting stat boosts or milestones.

**Tech Stack:** React (TypeScript), Vanilla CSS, Vitest for testing.

---

### Task 1: Create LevelUp Component and Basic Structure

**Files:**
- Create: `src/components/Progression/LevelUp.tsx`
- Create: `src/components/Progression/LevelUp.css`

- [ ] **Step 1: Create the directory structure**

Run: `mkdir -p src/components/Progression`

- [ ] **Step 2: Define the props and basic component structure**

```tsx
import React from 'react';
import { Unit } from '../../types/game';
import './LevelUp.css';

interface LevelUpProps {
  leveledUnits: Unit[];
  onSelectStat: (unitId: string, stat: 'atk' | 'hp') => void;
  onSelectMilestone: (unitId: string, milestone: string) => void;
  onConfirm: () => void;
}

export const LevelUp: React.FC<LevelUpProps> = ({
  leveledUnits,
  onSelectStat,
  onSelectMilestone,
  onConfirm,
}) => {
  return (
    <div className="level-up-overlay">
      <div className="level-up-container">
        <h1>Level Up!</h1>
        <div className="units-grid">
          {leveledUnits.map(unit => (
            <div key={unit.id} className="unit-card">
              <h2>{unit.name}</h2>
              <p>Level {unit.level}</p>
              {/* Rewards will go here */}
            </div>
          ))}
        </div>
        <button className="confirm-button" onClick={onConfirm}>
          Confirm and Continue
        </button>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Add basic CSS**

```css
.level-up-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: #fff;
}

.level-up-container {
  background: #1a1a2e;
  border: 2px solid #00d2ff;
  border-radius: 8px;
  padding: 2rem;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  text-align: center;
}

.units-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.unit-card {
  background: #16213e;
  border: 1px solid #334756;
  border-radius: 6px;
  padding: 1.5rem;
}

.confirm-button {
  background: #00d2ff;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button:hover {
  background: #33e0ff;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Progression/LevelUp.tsx src/components/Progression/LevelUp.css
git commit -m "feat: add LevelUp component structure"
```

### Task 2: Implement Stat Boost Choice (Regular Levels)

**Files:**
- Modify: `src/components/Progression/LevelUp.tsx`

- [ ] **Step 1: Add stat boost options to the unit card**

```tsx
{/* Inside leveledUnits.map */}
<div className="stat-choices">
  <button onClick={() => onSelectStat(unit.id, 'atk')}>
    Increase Firepower (+5 ATK)
  </button>
  <button onClick={() => onSelectStat(unit.id, 'hp')}>
    Reinforce Hull (+10 Max HP)
  </button>
</div>
```

- [ ] **Step 2: Track which units have made choices to enable the confirm button**

- [ ] **Step 3: Update CSS for choices**

- [ ] **Step 4: Commit**

```bash
git add src/components/Progression/LevelUp.tsx
git commit -m "feat: implement stat boost choices in LevelUp"
```

### Task 3: Implement Milestone Choice (Level 3/6)

**Files:**
- Modify: `src/components/Progression/LevelUp.tsx`

- [ ] **Step 1: Add logic to check for milestones (Level 3 or 6)**

- [ ] **Step 2: Display milestone options if applicable**

```tsx
const isMilestone = unit.level === 3 || unit.level === 6;
// ...
{isMilestone ? (
  <div className="milestone-choices">
    <button onClick={() => onSelectMilestone(unit.id, 'Heavy Shielding')}>
      Heavy Shielding
    </button>
    <button onClick={() => onSelectMilestone(unit.id, 'Rapid Fire')}>
      Rapid Fire
    </button>
  </div>
) : (
  <div className="stat-choices">
    {/* ... */}
  </div>
)}
```

- [ ] **Step 3: Update CSS for milestones**

- [ ] **Step 4: Commit**

```bash
git add src/components/Progression/LevelUp.tsx
git commit -m "feat: implement milestone choices in LevelUp"
```

### Task 4: Finalize Unit Selection and Confirmation

**Files:**
- Modify: `src/components/Progression/LevelUp.tsx`

- [ ] **Step 1: Manage local state for selections**

- [ ] **Step 2: Disable confirm button until all units have selections**

- [ ] **Step 3: Commit**

```bash
git add src/components/Progression/LevelUp.tsx
git commit -m "feat: finalize unit selection and confirmation logic"
```

### Task 5: Write Tests

**Files:**
- Create: `src/components/Progression/__tests__/LevelUp.test.tsx`

- [ ] **Step 1: Write tests for regular level up**

- [ ] **Step 2: Write tests for milestone level up**

- [ ] **Step 3: Run tests**

Run: `npm test src/components/Progression/__tests__/LevelUp.test.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/Progression/__tests__/LevelUp.test.tsx
git commit -m "test: add tests for LevelUp component"
```
