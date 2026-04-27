import { useGameState } from './hooks/useGameState';
import { SectorMap } from './components/Map/SectorMap';
import { BattleArena } from './components/Combat/BattleArena';
import { LevelUp } from './components/Progression/LevelUp';
import type { Unit } from './types/game';
import { UnitType } from './types/game';
import './App.css';

function App() {
  const { 
    state, 
    travel, 
    resolveBattle, 
    upgradeUnit, 
    closeLevelUp 
  } = useGameState();

  const handleBattleEnd = (result: 'victory' | 'defeat') => {
    const playerWon = result === 'victory';
    // Simulated HP losses for the prototype
    const hpLosses: Record<string, number> = {};
    if (playerWon) {
      state.squad.forEach(u => {
        hpLosses[u.id] = Math.floor(Math.random() * 5);
      });
    }

    const xpGain = playerWon ? 25 : 5;
    const creditsGain = playerWon ? 50 : 10;
    resolveBattle(xpGain, creditsGain, hpLosses);
  };

  const generateEnemySquad = (level: number): Unit[] => {
    // Basic enemy generation for the prototype
    const types = [UnitType.Plating, UnitType.Shields, UnitType.Bio];
    return Array.from({ length: 3 }).map((_, i) => ({
      id: `e-${i}`,
      name: `Enemy Drone ${i + 1}`,
      type: types[i % types.length],
      hp: 30 + level * 5,
      maxHp: 30 + level * 5,
      atk: 5 + level,
      level: level,
      xp: 0,
      xpToNext: 100,
      milestones: [],
    }));
  };

  const renderScreen = () => {
    switch (state.screen) {
      case 'MAP':
        return (
          <div className="game-container">
            <header className="game-header">
              <h1>Sector Navigation</h1>
              <div className="stats">
                <span>Credits: {state.credits}</span>
                <span>Depth: {state.currentLevel}</span>
              </div>
            </header>
            <SectorMap 
              map={state.map} 
              currentNodeId={state.currentNodeId} 
              currentLevel={state.currentLevel}
              onTravel={travel} 
            />
          </div>
        );

      case 'BATTLE':
        return (
          <div className="game-container">
            <BattleArena 
              playerSquad={state.squad} 
              enemySquad={generateEnemySquad(state.currentLevel)} 
              onBattleEnd={handleBattleEnd} 
            />
          </div>
        );

      case 'LEVEL_UP': {
        const leveledUnits = state.squad.filter(u => state.lastBattleLeveledUnits.includes(u.id));
        return (
          <div className="game-container">
            <LevelUp 
              leveledUnits={leveledUnits} 
              onSelectStat={(id, stat) => {
                if (stat === 'hp') upgradeUnit(id, { maxHp: 10 });
                else upgradeUnit(id, { atk: 5 });
              }} 
              onSelectMilestone={(id, milestone) => upgradeUnit(id, { milestone })} 
              onConfirm={closeLevelUp} 
            />
          </div>
        );
      }

      case 'SHOP':
        return (
          <div className="game-container centered">
            <h2>Trade Hub</h2>
            <p>Welcome to the Trade Hub. (Shop implementation coming soon...)</p>
            <button className="nav-button" onClick={closeLevelUp}>Return to Map</button>
          </div>
        );

      case 'EVENT':
        return (
          <div className="game-container centered">
            <h2>Distress Signal</h2>
            <p>A faint signal is coming from a nearby moon... (Events coming soon...)</p>
            <button className="nav-button" onClick={closeLevelUp}>Return to Map</button>
          </div>
        );

      default:
        return <div>Unknown Screen</div>;
    }
  };

  return (
    <div className="star-commander-app">
      {renderScreen()}
    </div>
  );
}

export default App;
