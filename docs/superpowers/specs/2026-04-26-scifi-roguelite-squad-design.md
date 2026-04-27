# 2026-04-26 Sci-Fi Roguelite Squad - Battle Arena UI Spec

**Goal:** Implement a 3-lane "Battle Arena" component for the squad auto-battler prototype.

## Architecture

The `BattleArena` component will be the primary container for the combat UI. It will manage the local state of a single combat encounter.

### Components

1.  **`BattleArena` (Container)**
    *   Manages game loop (simulation interval).
    *   Tracks HP for 3 player units, 3 enemy units, and 2 Command Hubs.
    *   Renders the 3 lanes and the hubs.
    *   Handles "Start Battle" and "Victory/Defeat" states.

2.  **`Lane` (Layout)**
    *   A horizontal sector containing a Player Slot and an Enemy Slot.
    *   Visualizes the "combat line" between units.

3.  **`UnitCard` (Display)**
    *   Displays Unit name, type icon/label, and HP bar.
    *   Visual feedback for taking damage (shake, flash).

4.  **`CommandHub` (Display)**
    *   Large HP bar at the far left (Player) and far right (Enemy).
    *   Labels: "PLAYER HUB" and "ENEMY HUB".

### Data Flow

*   **Props:**
    *   `playerSquad: Unit[]` (exactly 3 units for now).
    *   `enemySquad: Unit[]` (exactly 3 units).
    *   `onBattleEnd: (result: 'victory' | 'defeat') => void`.
*   **State:**
    *   `combatState: 'idle' | 'fighting' | 'resolved'`.
    *   `playerHP: number[]` (current HP of units).
    *   `enemyHP: number[]` (current HP of units).
    *   `hubHP: { player: number, enemy: number }`.

## Combat Logic (Simulation)

1.  **Interval:** Every 1.5 seconds, all active units "attack".
2.  **Targeting:**
    *   Unit in Lane *i* attacks counterpart in Lane *i*.
    *   If counterpart is at 0 HP, Unit in Lane *i* attacks the enemy Command Hub.
3.  **Damage Calculation:** Use `calculateDamage(attacker.type, defender.type, attacker.atk)`.
    *   Command Hub is treated as "Plating" type for damage calculations? Or just 1.0 multiplier? Let's say Hub is neutral (no multiplier) to keep it simple, or `UnitType.Plating`.
4.  **Win Condition:**
    *   If `hubHP.enemy <= 0` -> Victory.
    *   If `hubHP.player <= 0` -> Defeat.

## Visual Design (Sci-Fi)

*   **Background:** Dark hex grid or deep space pattern.
*   **Lanes:** Transparent dark panels with glowing borders (Cyan for player side, Red for enemy side).
*   **Animations:**
    *   Units pulse when attacking.
    *   Damage numbers float up.
    *   HP bars transition smoothly.

## Testing Strategy

*   Render test: Ensure "Start Battle" button and all lanes appear.
*   Interaction test: Click "Start Battle" starts the simulation.
*   Logic test (simulated): Mock `setInterval` to verify HP decreases over time.
