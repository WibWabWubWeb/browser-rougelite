# Update Battle Resolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `useGameState` hook's `RESOLVE_BATTLE` action to accept final HPs and handle squad leveling and survival correctly.

**Architecture:**
- Modify `GameAction` type to change `hpLosses` to `updatedHPs`.
- Update `gameReducer` to set unit HPs directly from `updatedHPs` (defaulting to current HP if not provided).
- Ensure leveling logic tracks `lastBattleLeveledUnits` correctly.
- Update `useGameState` callback signature.
- Verify with tests.

**Tech Stack:** React, TypeScript, Vitest.

---

### Task 1: Research and Test Reproduction

**Files:**
- Modify: `src/hooks/__tests__/useGameState.test.ts`

- [ ] **Step 1: Update existing tests to reflect new `updatedHPs` interface**

```typescript
  it('should resolve battle with updated HPs', () => {
    const { result } = renderHook(() => useGameState());
    const firstUnitId = result.current.state.squad[0].id;
    const initialCredits = result.current.state.credits;

    act(() => {
      // Changed from hpLosses to updatedHPs
      result.current.resolveBattle(5, 20, { [firstUnitId]: 10 });
    });

    const updatedUnit = result.current.state.squad.find(u => u.id === firstUnitId)!;
    expect(updatedUnit.hp).toBe(10);
    expect(updatedUnit.xp).toBe(5);
    expect(result.current.state.credits).toBe(initialCredits + 20);
  });
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test src/hooks/__tests__/useGameState.test.ts`
Expected: FAIL due to type mismatch or logic error.

---

### Task 2: Update useGameState.ts

**Files:**
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Update `GameAction` type and `resolveBattle` signature**

```typescript
  | { type: 'RESOLVE_BATTLE'; xpGain: number; creditsGain: number; updatedHPs: Record<string, number> }
```

- [ ] **Step 2: Update `gameReducer` logic for `RESOLVE_BATTLE`**

```typescript
    case 'RESOLVE_BATTLE': {
      const leveledUnitIds: string[] = [];
      const updatedSquad = state.squad.map(unit => {
        // Use updated HP if provided, otherwise keep current HP (but clamped to 0)
        const newHp = action.updatedHPs[unit.id] !== undefined 
          ? Math.max(0, action.updatedHPs[unit.id]) 
          : unit.hp;
        
        let newXp = unit.xp + action.xpGain;
        let newLevel = unit.level;
        let newXpToNext = unit.xpToNext;

        // Level up logic (loop in case of multiple level ups)
        while (newXp >= newXpToNext) {
          newXp -= newXpToNext;
          newLevel += 1;
          newXpToNext = Math.floor(newXpToNext * 1.5);
          if (!leveledUnitIds.includes(unit.id)) {
            leveledUnitIds.push(unit.id);
          }
        }

        return {
          ...unit,
          hp: newHp,
          xp: newXp,
          level: newLevel,
          xpToNext: newXpToNext,
        };
      });

      return {
        ...state,
        squad: updatedSquad,
        credits: state.credits + action.creditsGain,
        lastBattleLeveledUnits: leveledUnitIds,
        screen: leveledUnitIds.length > 0 ? 'LEVEL_UP' : 'MAP',
      };
    }
```

- [ ] **Step 3: Update `resolveBattle` callback**

```typescript
  const resolveBattle = useCallback((xpGain: number, creditsGain: number, updatedHPs: Record<string, number>) => {
    dispatch({ type: 'RESOLVE_BATTLE', xpGain, creditsGain, updatedHPs });
  }, []);
```

- [ ] **Step 4: Run tests and verify success**

Run: `npm test src/hooks/__tests__/useGameState.test.ts`
Expected: PASS

---

### Task 3: Final Verification and Commit

**Files:**
- Modify: `src/App.tsx` (to fix compilation and match new hook interface)

- [ ] **Step 1: Update `App.tsx` to pass final HPs instead of losses**

```typescript
  const handleBattleEnd = (result: 'victory' | 'defeat') => {
    const playerWon = result === 'victory';
    const updatedHPs: Record<string, number> = {};
    
    // For now, still simulate or if we have BattleArena results, use them.
    // The task asks to reflect 1v1 gauntlet results.
    // Since App.tsx currently simulates, we update it to use the new format.
    state.squad.forEach(u => {
      if (playerWon) {
        updatedHPs[u.id] = Math.max(0, u.hp - Math.floor(Math.random() * 5));
      } else {
        // If defeat, at least the first unit must be 0 HP in a 1v1 gauntlet logic
        // but for general squad-wipe, we might just set all to 0 or leave as is.
        updatedHPs[u.id] = 0; 
      }
    });

    const xpGain = playerWon ? 25 : 5;
    const creditsGain = playerWon ? 50 : 10;
    resolveBattle(xpGain, creditsGain, updatedHPs);
  };
```

- [ ] **Step 2: Commit changes**

```bash
git add src/hooks/useGameState.ts src/hooks/__tests__/useGameState.test.ts src/App.tsx
git commit -m "feat: update battle resolution for squad-wipe conditions"
```
