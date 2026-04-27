# Task 1: Data Model and State Actions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the global state to support narrative game events and their resolution.

**Architecture:** Extend `GameState` with narrative event types and a new action `RESOLVE_EVENT` to handle choices. Use a standard reducer pattern for state updates, including bulk unit modifications (HP/XP) and inventory/credit management.

**Tech Stack:** React, TypeScript, Vitest

---

### Task 1: Extend Data Model

**Files:**
- Modify: `src/types/game.ts`

- [ ] **Step 1: Add Event interfaces**

```typescript
export interface EventOutcome {
  id: string;
  text: string;
  credits?: number;
  hp?: number; // percentage of current HP, e.g. -10 means -10%
  xp?: number;
  item?: ShopItem;
}

export interface EventChoice {
  id: string;
  label: string;
  description: string;
  outcomes: EventOutcome[];
}

export interface GameEvent {
  id: string;
  title: string;
  prompt: string;
  choices: EventChoice[];
}
```

- [ ] **Step 2: Verify compilation**
Run: `npm run tsc`
Expected: PASS

### Task 2: Implement State Actions and Reducer Logic

**Files:**
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Write failing test for RESOLVE_EVENT**

```typescript
// In src/hooks/__tests__/useGameState.test.ts

  it('should resolve an event and apply outcomes', () => {
    const { result } = renderHook(() => useGameState());
    const mockSquad = getMockSquad();
    
    act(() => {
      result.current.chooseSquad(mockSquad);
    });

    const mockItem = {
      id: 'item1',
      name: 'Medkit',
      category: 'consumable' as const,
      cost: 50,
      description: 'Heals 5 HP',
      effect: { hp: 5 }
    };

    const outcome = {
      id: 'o1',
      text: 'Gained credits and XP, but lost HP and got an item',
      credits: 50,
      hp: -10, // -10% of current HP (10) = -1 HP
      xp: 5,
      item: mockItem
    };

    act(() => {
      // We need to trigger a travel first to set the screen to EVENT if we want to check screen transition
      // Or we can just dispatch the action directly if the hook allowed it, but it's encapsulated.
      // So we'll add resolveEvent to the hook.
      result.current.resolveEvent(outcome);
    });

    expect(result.current.state.credits).toBe(150);
    expect(result.current.state.squad[0].hp).toBe(9);
    expect(result.current.state.squad[0].xp).toBe(5);
    expect(result.current.state.inventory).toContainEqual(mockItem);
    expect(result.current.state.screen).toBe('MAP');
  });
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test src/hooks/__tests__/useGameState.test.ts`
Expected: FAIL (resolveEvent is not a function)

- [ ] **Step 3: Add RESOLVE_EVENT to GameAction type**

```typescript
// In src/hooks/useGameState.ts
export type GameAction =
  // ... existing
  | { type: 'RESOLVE_EVENT'; outcome: EventOutcome };
```

- [ ] **Step 4: Implement RESOLVE_EVENT reducer case**

```typescript
// In src/hooks/useGameState.ts reducer
    case 'RESOLVE_EVENT': {
      const { outcome } = action;
      const updatedSquad = state.squad.map(unit => {
        const hpChange = outcome.hp ? Math.floor(unit.hp * (outcome.hp / 100)) : 0;
        const newHp = Math.max(0, Math.min(unit.maxHp, unit.hp + hpChange));
        return {
          ...unit,
          hp: newHp,
          xp: unit.xp + (outcome.xp || 0),
        };
      });

      const newInventory = outcome.item 
        ? [...state.inventory, outcome.item] 
        : state.inventory;

      return {
        ...state,
        squad: updatedSquad,
        credits: state.credits + (outcome.credits || 0),
        inventory: newInventory,
        screen: 'MAP',
      };
    }
```

- [ ] **Step 5: Export resolveEvent callback**

```typescript
// In src/hooks/useGameState.ts hook return
  const resolveEvent = useCallback((outcome: EventOutcome) => {
    dispatch({ type: 'RESOLVE_EVENT', outcome });
  }, []);

  return {
    // ... existing
    resolveEvent,
  };
```

- [ ] **Step 6: Run test to verify it passes**
Run: `npm test src/hooks/__tests__/useGameState.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**
```bash
git add src/types/game.ts src/hooks/useGameState.ts src/hooks/__tests__/useGameState.test.ts
git commit -m "feat: add event data models and resolution state logic"
```
