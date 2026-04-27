# Spec: Random Events System

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of narrative choice-based encounters for '?' nodes.

## 1. Overview
Replace the placeholder text on 'EVENT' nodes with a fully realized choice-driven narrative system. Players will encounter various scenarios where they must weigh explicit risks and rewards to improve their squad's chances of survival.

## 2. Core Features

### 2.1 Narrative Interface (`EventScreen.tsx`)
- **Cinematic Presentation:** Full-screen layout with a central story prompt.
- **Choice Cards:** 2-3 large interactive panels representing decisions.
- **Outcome Transparency:** Every choice card explicitly displays its effects (e.g., "+50 Credits", "-10 HP to Lead Unit").
- **Result Overlay:** A final confirmation screen summarizing what was gained or lost before returning to the Map.

### 2.2 Event Mechanics
- **Event Pool:** A library of data-driven events (e.g., "Derelict Freighter", "Solar Storm", "Mysterious Merchant").
- **Effect Types:**
    - **Currency:** Gain or lose Credits.
    - **Health:** Heal or damage specific units or the whole squad.
    - **Inventory:** Receive random Shop Items (Consumables/Modules).
    - **Experience:** Direct XP gain for units.
- **Probabilistic Outcomes:** Some choices may have a "Success/Failure" chance (e.g., "50% Chance to find a Module, 50% Chance to take 20 damage").

## 3. Technical Changes

### 3.1 Data Model (`types/game.ts`)
- Define `GameEvent`, `EventChoice`, and `EventOutcome` interfaces.
- Outcome interface should support multiple keys: `credits?`, `hp?`, `xp?`, `item?`.

### 3.2 State Management (`useGameState.ts`)
- **New Action:** `RESOLVE_EVENT` to apply chosen outcomes to the global state.
- **Reducer:** Implement logic to process multiple outcome effects simultaneously.

### 3.3 Logic (`logic/events.ts`)
- Create a centralized registry of all game events.
- Implement a `getRandomEvent()` selector.

## 4. Success Criteria
- [ ] Entering an Event node triggers the `EventScreen`.
- [ ] Choice outcomes are accurately reflected in the player's state (Credits, HP, etc.).
- [ ] The UI remains "neat" and centered across 2K and lower resolutions.
- [ ] The result of a choice is clearly communicated before returning to the map.
