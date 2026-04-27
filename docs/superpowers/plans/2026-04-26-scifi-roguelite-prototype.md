# Battle Arena UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the `BattleArena` component for 3-lane siege combat.

**Architecture:** A React component that manages combat state (HP, status) and simulates attacks every 1s using `setInterval`. It renders 3 lanes with player/enemy units and two Command Hubs.

**Tech Stack:** React, TypeScript, Vitest, Testing Library, Vanilla CSS.

---

### Task 1: Scaffolding and Styles

**Files:**
- Create: `src/components/Combat/BattleArena.css`
- Create: `src/components/Combat/BattleArena.tsx` (Scaffold)

- [ ] **Step 1: Create CSS file with Sci-Fi styles**

```css
.battle-arena {
  background: #0a0a1a;
  color: #00ffff;
  padding: 20px;
  border: 2px solid #004444;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Courier New', Courier, monospace;
}

.arena-hubs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hub {
  width: 200px;
  text-align: center;
}

.hub-hp-bar {
  height: 20px;
  background: #222;
  border: 1px solid #444;
  margin-top: 5px;
}

.hub-hp-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.player-hub .hub-hp-fill { background: #00ff00; }
.enemy-hub .hub-hp-fill { background: #ff0000; }

.status-display {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lanes {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.lane {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px dashed #004444;
}

.unit-card {
  width: 120px;
  padding: 10px;
  border: 1px solid #008888;
  background: #111;
  text-align: center;
}

.unit-card.dead {
  opacity: 0.5;
  border-color: #444;
}

.unit-hp-bar {
  height: 8px;
  background: #333;
  margin-top: 4px;
}

.unit-hp-fill {
  height: 100%;
}

.start-btn {
  padding: 10px 20px;
  background: #008888;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.start-btn:disabled {
  background: #444;
  cursor: not-allowed;
}

.fighting-label {
  font-weight: bold;
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  from { opacity: 1; }
  to { opacity: 0.5; }
}
```

- [ ] **Step 2: Create BattleArena Scaffold**

```tsx
import React, { useState, useEffect } from 'react';
import './BattleArena.css';
import { Unit } from '../../types/game';

interface BattleArenaProps {
  playerSquad: Unit[];
  enemySquad: Unit[];
  onBattleEnd: (result: 'victory' | 'defeat') => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  playerSquad,
  enemySquad,
  onBattleEnd
}) => {
  return (
    <div className="battle-arena">
      <div className="arena-hubs">
        <div className="hub player-hub">
          <span>PLAYER HUB</span>
          <div className="hub-hp-bar"><div className="hub-hp-fill" style={{ width: '100%' }}></div></div>
        </div>
        <div className="status-display">
          <button className="start-btn">START BATTLE</button>
        </div>
        <div className="hub enemy-hub">
          <span>ENEMY HUB</span>
          <div className="hub-hp-bar"><div className="hub-hp-fill" style={{ width: '100%' }}></div></div>
        </div>
      </div>
      <div className="lanes">
        {[0, 1, 2].map(i => (
          <div key={i} className="lane">
            <div className="unit-card">{playerSquad[i]?.name || 'Empty'}</div>
            <div className="lane-divider">vs</div>
            <div className="unit-card">{enemySquad[i]?.name || 'Empty'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Commit**

```bash
mkdir -p src/components/Combat
git add src/components/Combat/BattleArena.css src/components/Combat/BattleArena.tsx
git commit -m "feat: scaffold BattleArena component and styles"
```

### Task 2: Combat Logic and State

**Files:**
- Modify: `src/components/Combat/BattleArena.tsx`

- [ ] **Step 1: Implement unified state and simulation logic**

```tsx
import React, { useState, useEffect } from 'react';
import './BattleArena.css';
import { Unit } from '../../types/game';
import { calculateDamage } from '../../logic/combat';

interface BattleArenaProps {
  playerSquad: Unit[];
  enemySquad: Unit[];
  onBattleEnd: (result: 'victory' | 'defeat') => void;
}

interface BattleState {
  playerHPs: number[];
  enemyHPs: number[];
  hubHPs: { player: number; enemy: number };
  status: 'idle' | 'fighting' | 'victory' | 'defeat';
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  playerSquad,
  enemySquad,
  onBattleEnd
}) => {
  const [state, setState] = useState<BattleState>({
    playerHPs: playerSquad.map(u => u.hp),
    enemyHPs: enemySquad.map(u => u.hp),
    hubHPs: { player: 100, enemy: 100 },
    status: 'idle'
  });

  useEffect(() => {
    if (state.status !== 'fighting') return;

    const interval = setInterval(() => {
      setState(prev => {
        const nextPlayerHPs = [...prev.playerHPs];
        const nextEnemyHPs = [...prev.enemyHPs];
        let nextHubPlayer = prev.hubHPs.player;
        let nextHubEnemy = prev.hubHPs.enemy;

        for (let i = 0; i < 3; i++) {
          // Player attacks
          if (nextPlayerHPs[i] > 0) {
            const attacker = playerSquad[i];
            if (nextEnemyHPs[i] > 0) {
              const damage = calculateDamage(attacker.type, enemySquad[i].type, attacker.atk);
              nextEnemyHPs[i] = Math.max(0, nextEnemyHPs[i] - damage);
            } else {
              const damage = calculateDamage(attacker.type, 'Plating', attacker.atk);
              nextHubEnemy = Math.max(0, nextHubEnemy - damage);
            }
          }

          // Enemy attacks
          if (nextEnemyHPs[i] > 0) {
            const attacker = enemySquad[i];
            if (nextPlayerHPs[i] > 0) {
              const damage = calculateDamage(attacker.type, playerSquad[i].type, attacker.atk);
              nextPlayerHPs[i] = Math.max(0, nextPlayerHPs[i] - damage);
            } else {
              const damage = calculateDamage(attacker.type, 'Plating', attacker.atk);
              nextHubPlayer = Math.max(0, nextHubPlayer - damage);
            }
          }
        }

        let nextStatus = prev.status;
        if (nextHubEnemy <= 0) nextStatus = 'victory';
        else if (nextHubPlayer <= 0) nextStatus = 'defeat';

        return {
          playerHPs: nextPlayerHPs,
          enemyHPs: nextEnemyHPs,
          hubHPs: { player: nextHubPlayer, enemy: nextHubEnemy },
          status: nextStatus
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, playerSquad, enemySquad]);

  useEffect(() => {
    if (state.status === 'victory' || state.status === 'defeat') {
      onBattleEnd(state.status);
    }
  }, [state.status, onBattleEnd]);

  const renderUnit = (unit: Unit, currentHp: number) => {
    if (!unit) return <div className="unit-card empty">Empty</div>;
    const hpPercent = Math.max(0, (currentHp / unit.maxHp) * 100);
    return (
      <div className={`unit-card ${currentHp <= 0 ? 'dead' : ''}`}>
        <div className="unit-name">{unit.name}</div>
        <div className="unit-type" style={{ fontSize: '0.8em', color: '#888' }}>{unit.type}</div>
        <div className="unit-hp-bar">
          <div className="unit-hp-fill" style={{ width: `${hpPercent}%`, background: hpPercent < 30 ? '#ff4444' : '#00ff00' }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="battle-arena">
      <div className="arena-hubs">
        <div className="hub player-hub">
          <span>PLAYER HUB</span>
          <div className="hub-hp-bar">
            <div className="hub-hp-fill" style={{ width: `${state.hubHPs.player}%` }}></div>
          </div>
        </div>
        <div className="status-display">
          {state.status === 'idle' && (
            <button className="start-btn" onClick={() => setState(p => ({ ...p, status: 'fighting' }))}>
              START BATTLE
            </button>
          )}
          {state.status === 'fighting' && <div className="fighting-label">ENGAGED</div>}
          {state.status === 'victory' && <div className="victory-label" style={{ color: '#00ff00' }}>VICTORY</div>}
          {state.status === 'defeat' && <div className="defeat-label" style={{ color: '#ff0000' }}>DEFEAT</div>}
        </div>
        <div className="hub enemy-hub">
          <span>ENEMY HUB</span>
          <div className="hub-hp-bar">
            <div className="hub-hp-fill" style={{ width: `${state.hubHPs.enemy}%` }}></div>
          </div>
        </div>
      </div>
      <div className="lanes">
        {[0, 1, 2].map(i => (
          <div key={i} className="lane">
            {renderUnit(playerSquad[i], state.playerHPs[i])}
            <div className="lane-divider">VS</div>
            {renderUnit(enemySquad[i], state.enemyHPs[i])}
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Combat/BattleArena.tsx
git commit -m "feat: implement battle state and simulation logic"
```

### Task 3: Basic Tests

**Files:**
- Create: `src/components/Combat/__tests__/BattleArena.test.tsx`

- [ ] **Step 1: Write tests**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BattleArena } from '../BattleArena';
import { UnitType } from '../../../types/game';
import { describe, it, expect, vi } from 'vitest';

const mockSquad = [
  { id: '1', name: 'Unit 1', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 2, level: 1, xp: 0, xpToNext: 10, milestones: [] },
  { id: '2', name: 'Unit 2', type: UnitType.Ion, hp: 10, maxHp: 10, atk: 2, level: 1, xp: 0, xpToNext: 10, milestones: [] },
  { id: '3', name: 'Unit 3', type: UnitType.Toxic, hp: 10, maxHp: 10, atk: 2, level: 1, xp: 0, xpToNext: 10, milestones: [] }
];

describe('BattleArena', () => {
  it('renders start button and units', () => {
    render(<BattleArena playerSquad={mockSquad} enemySquad={mockSquad} onBattleEnd={() => {}} />);
    expect(screen.getByText('START BATTLE')).toBeDefined();
    expect(screen.getAllByText('Unit 1')).toHaveLength(2);
  });

  it('starts battle when clicked', () => {
    render(<BattleArena playerSquad={mockSquad} enemySquad={mockSquad} onBattleEnd={() => {}} />);
    const btn = screen.getByText('START BATTLE');
    fireEvent.click(btn);
    expect(screen.getByText('ENGAGED')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run tests**

Run: `npm test src/components/Combat/__tests__/BattleArena.test.tsx`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
mkdir -p src/components/Combat/__tests__
git add src/components/Combat/__tests__/BattleArena.test.tsx
git commit -m "test: add basic tests for BattleArena"
```
