import { useGameState } from './hooks/useGameState';
import { SectorMap } from './components/Map/SectorMap';
import { BattleArena } from './components/Combat/BattleArena';
import { LevelUp } from './components/Progression/LevelUp';
import { DraftScreen } from './components/Draft/DraftScreen';
import type { Unit } from './types/game';
import { AttackType, ArmorType } from './types/game';
import './App.css';

function App() {
  const { 
    state, 
    travel, 
    resolveBattle, 
    upgradeUnit, 
    closeLevelUp,
    chooseSquad,
    reorderSquad
  } = useGameState();

  const handleBattleEnd = (result: 'victory' | 'defeat', updatedHPs: Record<string, number>) => {
    const playerWon = result === 'victory';
    const xpGain = playerWon ? 25 : 5;
    const creditsGain = playerWon ? 50 : 10;
    resolveBattle(xpGain, creditsGain, updatedHPs);
  };

  const generateEnemySquad = (level: number): Unit[] => {
    const atkPool = Object.values(AttackType);
    const defPool = Object.values(ArmorType);
    return Array.from({ length: 3 }).map((_, i) => ({
      id: `e-${i}`,
      name: `Enemy Drone ${i + 1}`,
      atkType: atkPool[i % atkPool.length],
      defType: defPool[i % defPool.length],
      hp: 30 + level * 5,
      maxHp: 30 + level * 5,
      atk: 5 + level,
      speed: 8 + level,
      level: level,
      xp: 0,
      xpToNext: 100,
      milestones: [],
    }));
  };

  const renderScreen = () => {
    switch (state.screen) {
      case 'DRAFT':
        return <DraftScreen onSelect={chooseSquad} />;

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
              squad={state.squad}
              onReorder={reorderSquad}
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
