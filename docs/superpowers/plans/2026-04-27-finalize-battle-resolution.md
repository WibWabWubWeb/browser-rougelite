# Finalize Battle Resolution Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `App.tsx` and `BattleArena.tsx` to correctly pass final HP values to the `resolveBattle` function, ensuring seamless integration between combat and game state.

**Architecture:**
1.  Extend `BattleArena`'s `onBattleEnd` callback to include `updatedHPs`.
2.  Update `BattleArena` to map internal `playerHPs` array back to unit IDs before calling `onBattleEnd`.
3.  Update `App.tsx` to receive these `updatedHPs` and pass them to `resolveBattle`.

**Tech Stack:** React, TypeScript, Vitest, Testing Library.

---

### Task 1: Update BattleArena Interface and Tests

**Files:**
- Modify: `src/components/Combat/BattleArena.tsx`
- Modify: `src/components/Combat/__tests__/BattleArena.test.tsx`

- [ ] **Step 1: Write a failing test in `BattleArena.test.tsx`**
Update an existing test or add a new one to verify `onBattleEnd` is called with the expected `updatedHPs` map.

```typescript
  it('calls onBattleEnd with final HPs', async () => {
    vi.useFakeTimers();
    const onBattleEnd = vi.fn();
    const quickSquad = [
      { id: 'q1', name: 'Quick', type: UnitType.Thermal, hp: 10, maxHp: 10, atk: 100, speed: 1000, level: 1, xp: 0, xpToNext: 10, milestones: [] }
    ];
    const weakEnemy = [
      { id: 'e1', name: 'Weak', type: UnitType.Thermal, hp: 1, maxHp: 1, atk: 1, speed: 1, level: 1, xp: 0, xpToNext: 10, milestones: [] }
    ];

    render(<BattleArena playerSquad={quickSquad} enemySquad={weakEnemy} onBattleEnd={onBattleEnd} />);
    fireEvent.click(screen.getByText('START BATTLE'));

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(onBattleEnd).toHaveBeenCalledWith('victory', { 'q1': 10 });
    vi.useRealTimers();
  });
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test src/components/Combat/__tests__/BattleArena.test.tsx`
Expected: FAIL due to interface mismatch or missing argument.

- [ ] **Step 3: Update `BattleArena.tsx` interface and implementation**
Update `BattleArenaProps` and the call to `onBattleEnd`.

```typescript
interface BattleArenaProps {
  playerSquad: Unit[];
  enemySquad: Unit[];
  onBattleEnd: (result: 'victory' | 'defeat', updatedHPs: Record<string, number>) => void;
}

// ... inside BattleArena component ...
  useEffect(() => {
    if (state.status === 'victory' || state.status === 'defeat') {
      const updatedHPs: Record<string, number> = {};
      playerSquad.forEach((unit, index) => {
        updatedHPs[unit.id] = state.playerHPs[index];
      });
      onBattleEnd(state.status, updatedHPs);
    }
  }, [state.status, onBattleEnd, playerSquad, state.playerHPs]);
```

- [ ] **Step 4: Update other tests in `BattleArena.test.tsx` to match interface**
Update previous tests that used `onBattleEnd`.

- [ ] **Step 5: Run tests to verify they pass**
Run: `npm test src/components/Combat/__tests__/BattleArena.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**
```bash
git add src/components/Combat/BattleArena.tsx src/components/Combat/__tests__/BattleArena.test.tsx
git commit -m "feat: update BattleArena to return final HPs on battle end"
```

### Task 2: Update App.tsx Integration

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `handleBattleEnd` in `App.tsx`**
Update the callback to accept `updatedHPs` and pass them to `resolveBattle`.

```typescript
  const handleBattleEnd = (result: 'victory' | 'defeat', updatedHPs: Record<string, number>) => {
    const playerWon = result === 'victory';
    const xpGain = playerWon ? 25 : 5;
    const creditsGain = playerWon ? 50 : 10;
    resolveBattle(xpGain, creditsGain, updatedHPs);
  };
```

- [ ] **Step 2: Verify build**
Run: `npm run build` or `npx tsc`
Expected: Success

- [ ] **Step 3: Run all tests**
Run: `npm test`
Expected: Success

- [ ] **Step 4: Commit**
```bash
git add src/App.tsx
git commit -m "feat: update battle resolution for squad-wipe conditions"
```
