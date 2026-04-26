# Design Specification: Star-Commander Roguelite

**Date:** 2026-04-26
**Status:** Draft
**Topic:** Sci-Fi Squad-Based Auto-Battler

## 1. Executive Summary
A browser-based roguelite where players build a squad of specialized sci-fi troops to navigate a hostile sector. The core gameplay revolves around tactical team composition, counter-picking enemy types, and managing unit growth through a hybrid leveling system. Combat is automated and played across three lanes.

## 2. Core Gameplay Loop
1.  **Navigate:** Choose a node on a branching "Sector Web" map.
2.  **Acquire/Upgrade:** 
    *   **Post-Battle:** Choose 1 of 3 random units to add to the roster.
    *   **Trade Hub (Shop):** Spend Credits to buy specific units or upgrades.
3.  **Prepare:** Assign units to one of three lanes (Top, Center, Bottom) based on revealed enemy types.
4.  **Battle:** Watch the automated 3-lane siege unfold.
5.  **Repeat:** Progress through the sector until the final boss or defeat.

## 3. Combat System: The 3-Lane Siege
Combat is divided into three distinct lanes.
*   **Deployment:** Players see the enemy's unit types in each lane and must deploy their own units accordingly.
*   **Resolution:** Units in the same lane fight their direct counterparts.
*   **Victory Condition:** Each lane won deals damage to the enemy "Command Hub" (Base). The battle is won when the Command Hub's HP reaches zero.
*   **Automation:** Once the battle starts, units attack based on their internal stats (Speed, Range, Damage) without player input.

## 4. The Star Cycle (Type Interactions)
Strategy is driven by a 6-type "Hard Counter" web:

| Damage Type | Counters (Strong Against) | Resisted By (Weak Against) |
| :--- | :--- | :--- |
| **Thermal** | Plating, Bio | Shields |
| **Ion** | Shields, Mechs | Plating |
| **Toxic** | Bio, Mechs | Shields |
| **Plating (Defense)** | Ion, Toxic | Thermal |
| **Shields (Defense)** | Thermal, Toxic | Ion |
| **Bio (Defense)** | Ion, Thermal | Toxic |

*Note: "Mechs" is an implicit sub-trait of certain units that makes them vulnerable to Ion and Toxic.*

## 5. Map & Progression
The map uses a branching "Web" structure (similar to *Slay the Spire*).
*   **Node Types:**
    *   **Skirmish:** Standard battle for Credits and a unit choice.
    *   **Elite:** Difficult battle for better rewards.
    *   **Trade Hub (Shop):** Currency-based troop acquisition.
    *   **Distress Signal:** Narrative events with choices/rewards.
    *   **Repair Bay:** Restore HP to damaged units.
    *   **Sector Boss:** The final challenge of the run.

## 6. Unit Progression: Hybrid Leveling
Units gain XP from participating in battles.
*   **Regular Levels (2, 4, 5...):** Player chooses between two stat boosts (e.g., +5 ATK or +10 HP).
*   **Milestone Levels (3, 6):** Player chooses between two distinct "Ability Branches" that define the unit's role (e.g., "Heavy Shielding" vs "Reflective Armor").

## 7. Technical Considerations (Prototype)
*   **Platform:** Web Browser (HTML5/TypeScript/React).
*   **State Management:** Local run state (current squad, credits, map position) and persistent "Meta" progression (if applicable).
*   **Visualization:** Simple 2D sprites or icons representing units in the lanes.

## 8. Success Criteria
*   Player can successfully complete a run through one sector.
*   Type-counters (Star Cycle) are visually clear and mechanically impactful.
*   The "Hybrid Leveling" system feels rewarding and provides meaningful choice.
