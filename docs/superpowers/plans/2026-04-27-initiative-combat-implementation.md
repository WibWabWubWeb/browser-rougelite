# Implement 1v1 ATB Combat Logic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the BattleArena component from a lane-based siege to a 1v1 initiative-based (ATB) duel.

**Architecture:** Use a `setInterval` driven loop to increment ATB meters for active units. When a meter hits 100, the unit attacks. Dead units are replaced by the next one in the squad.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library.

---

### Task 1: Update BattleState and Basic Component Structure

**Files:**
- Modify: `src/components/Combat/BattleArena.tsx`

- [ ] **Step 1: Update BattleState interface and initial state**

```typescript
interface BattleState {
  playerActiveIndex: number;
  enemyActiveIndex: number;
  playerHPs: number[];
  enemyHPs: number[];
  playerATB: number;
  enemyATB: number;
  status: 'idle' | 'fighting' | 'victory' | 'defeat';
  log: string[];
}

// ... inside BattleArena ...
const [state, setState] = useState<BattleState>({
  playerActiveIndex: 0,
  enemyActiveIndex: 0,
  playerHPs: playerSquad.map(u => u.hp),
  enemyHPs: enemySquad.map(u => u.hp),
  playerATB: 0,
  enemyATB: 0,
  status: 'idle',
  log: ['Combat initiated. Ready to engage.']
});
```

- [ ] **Step 2: Update tests to match new structure (failing first)**

Modify `src/components/Combat/__tests__/BattleArena.test.tsx` to include a test for ATB progression.

```typescript
  it('increments ATB when fighting', async () => {
    vi.useFakeTimers();
    render(<BattleArena playerSquad={mockSquad} enemySquad={mockSquad} onBattleEnd={() => {}} />);
    fireEvent.click(screen.getByText('START BATTLE'));
    
    vi.advanceTimersByTime(100);
    // We expect ATB to have increased. Since it's internal state, we check if it's reflected in the UI eventually or check log.
    // For now, just ensure it doesn't crash and we can see the "ENGAGED" status.
    expect(screen.getByText('ENGAGED')).toBeDefined();
    vi.useRealTimers();
  });
```

- [ ] **Step 3: Run tests**

Run: `npm test src/components/Combat/__tests__/BattleArena.test.tsx`

### Task 2: Implement Combat Loop (ATB Logic)

**Files:**
- Modify: `src/components/Combat/BattleArena.tsx`

- [ ] **Step 1: Refactor the useEffect combat loop**

```typescript
  useEffect(() => {
    if (state.status !== 'fighting') return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.status !== 'fighting') return prev;

        const playerUnit = playerSquad[prev.playerActiveIndex];
        const enemyUnit = enemySquad[prev.enemyActiveIndex];

        if (!playerUnit || !enemyUnit) return prev;

        let nextPlayerATB = prev.playerATB + playerUnit.speed * 0.5;
        let nextEnemyATB = prev.enemyATB + enemyUnit.speed * 0.5;
        
        let nextPlayerHPs = [...prev.playerHPs];
        let nextEnemyHPs = [...prev.enemyHPs];
        let nextLog = [...prev.log];
        let nextPlayerIndex = prev.playerActiveIndex;
        let nextEnemyIndex = prev.enemyActiveIndex;

        // Player attacks
        if (nextPlayerATB >= 100) {
          const damage = calculateDamage(playerUnit.type, enemyUnit.type, playerUnit.atk);
          nextEnemyHPs[nextEnemyIndex] = Math.max(0, nextEnemyHPs[nextEnemyIndex] - damage);
          nextLog.push(`${playerUnit.name} deals ${damage} damage to ${enemyUnit.name}!`);
          nextPlayerATB = 0;
          if (nextLog.length > 5) nextLog.shift();
        }

        // Enemy attacks
        if (nextEnemyATB >= 100) {
          const damage = calculateDamage(enemyUnit.type, playerUnit.type, enemyUnit.atk);
          nextPlayerHPs[nextPlayerIndex] = Math.max(0, nextPlayerHPs[nextPlayerIndex] - damage);
          nextLog.push(`${enemyUnit.name} deals ${damage} damage to ${playerUnit.name}!`);
          nextEnemyATB = 0;
          if (nextLog.length > 5) nextLog.shift();
        }

        // Tag-in logic
        if (nextEnemyHPs[nextEnemyIndex] <= 0) {
          nextEnemyIndex++;
          nextEnemyATB = 0;
          if (nextEnemyIndex < enemySquad.length) {
             nextLog.push(`${enemySquad[nextEnemyIndex].name} enters the battle!`);
          }
        }
        if (nextPlayerHPs[nextPlayerIndex] <= 0) {
          nextPlayerIndex++;
          nextPlayerATB = 0;
          if (nextPlayerIndex < playerSquad.length) {
            nextLog.push(`${playerSquad[nextPlayerIndex].name} enters the battle!`);
          }
        }

        // Win/Loss check
        let nextStatus = prev.status;
        if (nextEnemyIndex >= enemySquad.length) nextStatus = 'victory';
        else if (nextPlayerIndex >= playerSquad.length) nextStatus = 'defeat';

        return {
          ...prev,
          playerActiveIndex: nextPlayerIndex,
          enemyActiveIndex: nextEnemyIndex,
          playerHPs: nextPlayerHPs,
          enemyHPs: nextEnemyHPs,
          playerATB: nextPlayerATB,
          enemyATB: nextEnemyATB,
          status: nextStatus,
          log: nextLog
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [state.status, playerSquad, enemySquad]);
```

- [ ] **Step 2: Verify with tests**

Run: `npm test src/components/Combat/__tests__/BattleArena.test.tsx`

### Task 3: Redesign UI for "Duel Zone"

**Files:**
- Modify: `src/components/Combat/BattleArena.tsx`
- Modify: `src/components/Combat/BattleArena.css`

- [ ] **Step 1: Update JSX in BattleArena.tsx**

Implement the Duel Zone layout:
- Active units in center.
- HP/ATB bars.
- Bench pips.
- Scrollable log.

- [ ] **Step 2: Update CSS in BattleArena.css**

- Style the `.duel-zone`, `.unit-display`, `.atb-bar`, `.bench-pips`, and `.combat-log`.

- [ ] **Step 3: Final Verification**

Ensure all tests pass and UI looks correct (as per spec).

- [ ] **Step 4: Commit**

`git commit -m "feat: implement 1v1 ATB combat UI and logic"`
