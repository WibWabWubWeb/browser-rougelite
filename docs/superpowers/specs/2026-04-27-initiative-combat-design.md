# Spec: Initiative 1v1 Combat System

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Re-designing combat from 3-lane siege to 1v1 squad gauntlet with initiative.

## 1. Overview
Replace the existing 3-lane lane-pushing mechanics with a tactical 1v1 relay system. Combat focuses on two active units at the front of their respective squads, engaging in real-time based on an Active Time Bar (ATB) determined by their Speed stat.

## 2. Core Mechanics

### 2.1 The Gauntlet (1v1 Relay)
- Combat is strictly 1v1 between the "Active" units (index 0 of each squad).
- There is no Command Hub or Base HP. The battle ends when a squad is entirely wiped out.
- When a unit's HP reaches 0, it is removed. the next unit in the squad array immediately becomes the new "Active" unit.
- "Tag-in" units start with 0% ATB.

### 2.2 Active Time Bar (ATB) Initiative
- Each active unit has an `atb` value (0 to 100).
- **Tick Logic:** Every 100ms, `atb += (speed * constant)`.
- **Action Trigger:** When `atb >= 100`, the unit attacks, applies damage to the opponent, and resets its `atb` to 0.
- **Speed Stat:** A new numeric property for all units (default range 5-15).

### 2.3 Damage & Types
- The "Star Cycle" (Thermal > Plating > Shields > Ion > Bio > Toxic > Thermal) remains the primary damage modifier.
- Damage formula: `BaseAtk * TypeMultiplier`.

## 3. UI Design

### 3.1 Battle Arena Layout
- **The Duel Stage:** Large central area showing the two active units with animated HP and ATB bars.
- **Squad Queues:** Visual indicators (icons or pips) showing the remaining units in both squads behind the active fighters.
- **Combat Log:** A scrollable text feed at the bottom describing actions ("Interceptor deals 12 damage to Drone A").

### 3.2 Visual Feedback
- **ATB Fill:** Smoothly filling progress bars.
- **Combat Effects:** Simple CSS "shake" or "flash" on the unit cards when damage is dealt or received.

## 4. Technical Changes

### 4.1 Data Model (`types/game.ts`)
- Add `speed: number` to the `Unit` interface.

### 4.2 State Management (`useGameState.ts`)
- Remove `hubHPs` from the battle state.
- Update `RESOLVE_BATTLE` to handle squad-wipe conditions instead of hub destruction.

### 4.3 Combat Logic (`logic/combat.ts`)
- Implement the ATB tick and action trigger loop.
- Remove lane-specific targeting logic.

## 5. Success Criteria
- [ ] Combat transitions smoothly between units as they fall.
- [ ] Speed stat visibly affects attack frequency (fast units attack more often).
- [ ] Battle ends correctly when one squad has 0 units left.
- [ ] UI clearly shows who is fighting and who is "on deck".
