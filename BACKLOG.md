# Roguelite Project Backlog

## 🟢 Immediate Priority
- [x] **Expand Event Pool**: Added specialized encounters like Space Spider Plague and Acid Nebula.
- [x] **Clear Event Rewards**: Implemented a results screen with clear reward visualization.
- [x] **6x6 Combat Matrix**: Expanded from 3x3 to 6x6 with new Kinetic, Laser, and Cryo types.
- [ ] **XP Bar Visibility**: Add a visual XP progress bar to the unit cards in the `SquadBar` and other unit overviews.
- [ ] **Combat UI Overhaul**: Update the battle screen to show the full waiting line of units. Replace the small pips with detailed cards showing types and remaining HP for all upcoming squad members.
- [ ] **Attack Animations**: Implement visual feedback when attacks occur, such as hit flashes, unit "shaking" on impact, and floating damage numbers to make combat feel more impactful.

    - *Done: Spider Plague* - Thermal (100% win), Toxic (100% fail), Others (30% win).
    - *Done: Acid Nebula* - Plating (90% win), Bio (10% win), Others (50% win).
    - *Idea: Rogue AI* - Choice to hack the mainframe (XP/Risk) or shut it down (Credits).
    - *Idea: Wormhole Shortcut* - Choice to jump ahead (Skip depth/Risk HP) or stay on course.

## 🟡 Features & Improvements
- [ ] **Free Recruitment Node**: Add a new specialized node type on the map (e.g., "Mercenary Outpost") where players can hire a new unit for free to fill their 6-unit squad.
- [ ] **Boss Mechanics**: Implement unique squad behaviors or "Phases" for the Boss nodes.

- [ ] **Combat Animations**: Add projectile effects, hit flashes, and floating damage numbers.
- [ ] **Save/Load System**: Implement LocalStorage-based persistence for mid-run progress.
- [ ] **Elite Variations**: Give Elite battle nodes higher stats or special modules.

## 🔵 UI & Polish
- [ ] **Audio System**: Background music and sound effects for combat/UI.
- [ ] **Enhanced Visuals**: Add parallax backgrounds for the Map and Battle Arena.
- [ ] **Tutorial/Intro**: A short sequence explaining the 3x3 Combat Matrix to new players.

## 🔴 Future Goals
- [ ] **Steam/Web Export**: Optimize build for production deployment.
- [ ] **Modding Support**: Externalize data (units, events) to JSON for easy editing.
