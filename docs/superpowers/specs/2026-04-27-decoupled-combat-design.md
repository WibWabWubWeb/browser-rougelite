# Spec: Decoupled Combat Matrix

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of separate Attack and Defense types for all units.

## 1. Overview
Replace the single unit type system with a decoupled "Attack Type" and "Armor Type" system. This allows for 9 unique unit archetypes and a balanced 3x3 interaction grid, removing the "double negative" confusion of the previous loop.

## 2. Type Categories

### 2.1 Attack Types (ATK)
Determines the offensive properties of the unit's weapons.
- 🔥 **Thermal**: Melt-based weaponry.
- ⚡ **Ion**: Energy-based weaponry.
- ☣️ **Toxic**: Chemical-based weaponry.

### 2.2 Armor Types (DEF)
Determines how the unit resists different damage types.
- 🛡️ **Plating**: Physical hull plating.
- 🌀 **Shields**: Energy forcefields.
- 🌿 **Bio**: Organic/Regenerative hull.

## 3. The Interaction Grid (3x3)

| ATK \ DEF | 🛡️ **Plating** | 🌀 **Shields** | 🌿 **Bio** |
| :--- | :--- | :--- | :--- |
| 🔥 **Thermal** | **Strong (2x)** | Weak (0.5x) | Neutral (1x) |
| ⚡ **Ion** | Neutral (1x) | **Strong (2x)** | Weak (0.5x) |
| ☣️ **Toxic** | Weak (0.5x) | Neutral (1x) | **Strong (2x)** |

## 4. Technical Changes

### 4.1 Data Model (`types/game.ts`)
- Update `UnitType` to be split into `AttackType` and `ArmorType`.
- Update `Unit` interface to include `atkType: AttackType` and `defType: ArmorType`.
- Update `MapNode` to track `enemyAtkType` and `enemyDefType` for intel.

### 4.2 Combat Logic (`logic/combat.ts`)
- Refactor `calculateDamage` to use the 3x3 matrix based on `attacker.atkType` vs `defender.defType`.

### 4.3 UI Design
- **Unit Cards:** Show both icons (e.g., [🔥/🛡️]).
- **Star Cycle Graph:** Refactor to show a 3x3 grid or a bipartite graph showing how the 3 ATK types counter the 3 DEF types.
- **Map Intel:** Display both the Attack and Defense type of the primary enemy.

## 5. Success Criteria
- [ ] Every unit has both an ATK and DEF type.
- [ ] Combat damage accurately reflects the 3x3 interaction grid.
- [ ] The Star Cycle graph clearly explains the decoupled relationships.
- [ ] Map intel correctly shows both unit properties.
