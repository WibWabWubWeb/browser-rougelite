import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { SectorMap } from './components/Map/SectorMap';
import { BattleArena } from './components/Combat/BattleArena';
import { LevelUp } from './components/Progression/LevelUp';
import { DraftScreen } from './components/Draft/DraftScreen';
import { ShopScreen } from './components/Shop/ShopScreen';
import { EventScreen } from './components/Events/EventScreen';
import { GameOver } from './components/Shared/GameOver';
import { getRandomEvent } from './logic/events';
import type { Unit, GameEvent } from './types/game';
import { AttackType, ArmorType } from './types/game';
import './App.css';

export const generateEnemySquad = (level: number, forcedDefType?: ArmorType): Unit[] => {
  const atkPool = Object.values(AttackType);
  const defPool = Object.values(ArmorType);
  return Array.from({ length: 3 }).map((_, i) => ({
    id: `e-${i}`,
    name: `Enemy Drone ${i + 1}`,
    atkType: atkPool[i % atkPool.length],
    defType: forcedDefType || defPool[i % defPool.length],
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

function App() {
  const { 
    state, 
    travel, 
    resolveBattle, 
    upgradeUnit, 
    closeLevelUp,
    chooseSquad,
    reorderSquad,
    buyItem,
    equipModule,
    recruit,
    useItem,
    resolveEvent,
    restartGame
  } = useGameState();

  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);

  const handleBattleEnd = (result: 'victory' | 'defeat', updatedHPs: Record<string, number>) => {
    const playerWon = result === 'victory';
    const xpGain = playerWon ? 25 : 5;
    const creditsGain = playerWon ? 50 : 10;
    resolveBattle(xpGain, creditsGain, updatedHPs);
  };

  const renderScreen = () => {
    switch (state.screen) {
      case 'DRAFT':
        return (
          <div className="game-container centered">
            <DraftScreen onSelect={chooseSquad} />
          </div>
        );

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
              inventory={state.inventory}
              useItem={useItem}
            />
          </div>
        );

      case 'BATTLE': {
        const currentNode = state.map.find(n => n.id === state.currentNodeId);
        return (
          <div className="game-container">
            <BattleArena 
              playerSquad={state.squad} 
              enemySquad={generateEnemySquad(state.currentLevel, currentNode?.intelDefType)} 
              onBattleEnd={handleBattleEnd} 
            />
          </div>
        );
      }

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
          <div className="game-container">
            <ShopScreen
              credits={state.credits}
              squad={state.squad}
              buyItem={buyItem}
              equipModule={equipModule}
              recruit={recruit}
              onClose={closeLevelUp}
            />
          </div>
        );

      case 'EVENT': {
        if (!activeEvent) {
          const event = getRandomEvent();
          setActiveEvent(event);
          return <div className="game-container centered">Initializing Event...</div>;
        }
        return (
          <div className="game-container centered">
            <EventScreen 
              event={activeEvent} 
              squad={state.squad}
              onResolve={(outcome, targetUnitId) => {
                resolveEvent(outcome, targetUnitId);
                setActiveEvent(null);
              }} 
              recruit={recruit}
              removeUnit={removeUnit}
            />
          </div>
        );
      }

      case 'GAME_OVER':
        return (
          <div className="game-container centered">
            <GameOver depth={state.currentLevel} onRestart={restartGame} />
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
