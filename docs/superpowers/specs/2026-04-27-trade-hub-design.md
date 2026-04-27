# Spec: Trade Hub & Inventory System

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Implementation of a shop interface, consumable inventory, module equipment, and unit recruitment.

## 1. Overview
The Trade Hub provides the primary economic loop. Players spend credits earned in battle to buy consumables, permanent modules, or recruit new squad members. This requires a new full-screen dashboard, inventory management on the map, and complex purchasing interactions.

## 2. Core Features

### 2.1 Trade Hub Interface (`ShopScreen.tsx`)
- **Single Page Dashboard:** A full-screen view divided into three columns: Consumables, Modules, and Recruits.
- **Credit Display:** Prominently show the player's current `credits` at the top.
- **Dynamic Stock:** The shop generates a random assortment of items when entered.

### 2.2 Item Categories & Mechanics
- **Consumables (e.g., Repair Kit - 30c):**
    - One-time use items.
    - Purchasing adds them to the player's `inventory` array (global state).
- **Modules (e.g., Titanium Plating - 80c):**
    - Permanent passive upgrades.
    - Purchasing opens a modal to select a target unit.
    - The module's stat changes are permanently applied to the selected unit.
- **Recruits (e.g., Random Mercenary - 150c):**
    - Higher-level units generated similarly to the starting draft.
    - Purchasing opens a modal to select a unit to *replace*. The old unit is removed from the squad, and the new one takes its place.

### 2.3 Map Inventory Integration
- **Inventory Button:** Add an "Inventory" toggle on the `SectorMap` screen.
- **Usage:** Clicking it opens a panel showing owned consumables. Clicking a consumable allows the player to apply it to a specific unit in their squad.

## 3. Technical Changes

### 3.1 Data Model (`types/game.ts`)
- Add `ItemType` enum (Consumable, Module).
- Add `Item` interface defining effects (e.g., `effect: { heal?: number; maxHp?: number; atk?: number }`).
- Update `GameState` to include `inventory: Item[]`.

### 3.2 State Management (`useGameState.ts`)
- Update `RECRUIT` action to handle replacement (requires index/id of unit to replace).
- Add `BUY_ITEM` action to deduct credits and add to inventory.
- Add `USE_ITEM` action to apply a consumable's effect and remove it from inventory.
- Add `EQUIP_MODULE` action to apply permanent stat changes to a unit.

### 3.3 Components
- **`ShopScreen.tsx`:** The main shop dashboard.
- **`InventoryPanel.tsx`:** The map overlay for using consumables.
- **`TargetSelectionModal.tsx`:** A reusable modal for selecting which unit receives a module or gets replaced by a recruit.

## 4. Success Criteria
- [ ] Player can enter the shop from a Shop node.
- [ ] Shop displays three categories of items with prices.
- [ ] Purchasing deducts credits accurately.
- [ ] Consumables can be bought, stored, and used from the map screen to heal units.
- [ ] Modules permanently increase a chosen unit's stats.
- [ ] Recruits successfully replace an existing squad member.
