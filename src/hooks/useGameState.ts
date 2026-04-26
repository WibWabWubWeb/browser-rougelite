import { useReducer, useCallback } from 'react';
import { Unit, MapNode, NodeType } from '../types/game';
import { generateMap } from '../logic/map';

export type GameScreen = 'MAP' | 'BATTLE' | 'SHOP' | 'LEVEL_UP' | 'EVENT';

export interface GameState {
  squad: Unit[];
  credits: number;
  currentLevel: number;
  currentNodeId: string | null;
  map: MapNode[];
  screen: GameScreen;
}

type GameAction =
  | { type: 'TRAVEL'; nodeId: string }
  | { type: 'RECRUIT'; unit: Unit; cost: number }
  | { type: 'RESOLVE_BATTLE'; xpGain: number; creditsGain: number; hpLosses: Record<string, number> }
  | { type: 'HEAL_UNIT'; unitId: string; amount: number; cost: number };

const INITIAL_CREDITS = 100;
const MAP_DEPTH = 10;

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TRAVEL': {
      const node = state.map.find(n => n.id === action.nodeId);
      if (!node) return state;

      let nextScreen: GameScreen = 'MAP';
      switch (node.type) {
        case NodeType.Skirmish:
        case NodeType.Elite:
        case NodeType.Boss:
          nextScreen = 'BATTLE';
          break;
        case NodeType.Shop:
          nextScreen = 'SHOP';
          break;
        case NodeType.Repair:
        case NodeType.Event:
          nextScreen = 'EVENT';
          break;
      }

      return {
        ...state,
        currentNodeId: action.nodeId,
        currentLevel: node.depth,
        screen: nextScreen,
      };
    }

    case 'RECRUIT':
      return {
        ...state,
        squad: [...state.squad, action.unit],
        credits: state.credits - action.cost,
      };

    case 'RESOLVE_BATTLE': {
      const updatedSquad = state.squad.map(unit => {
        const hpLoss = action.hpLosses[unit.id] || 0;
        const newHp = Math.max(0, unit.hp - hpLoss);
        
        // Simple XP gain logic
        let newXp = unit.xp + action.xpGain;
        let newLevel = unit.level;
        let newXpToNext = unit.xpToNext;

        if (newXp >= unit.xpToNext) {
          newXp -= unit.xpToNext;
          newLevel += 1;
          newXpToNext = Math.floor(unit.xpToNext * 1.5);
        }

        return {
          ...unit,
          hp: newHp,
          xp: newXp,
          level: newLevel,
          xpToNext: newXpToNext,
        };
      });

      return {
        ...state,
        squad: updatedSquad,
        credits: state.credits + action.creditsGain,
        screen: 'LEVEL_UP', // Switch to level up/reward screen
      };
    }

    case 'HEAL_UNIT':
      return {
        ...state,
        squad: state.squad.map(unit =>
          unit.id === action.unitId
            ? { ...unit, hp: Math.min(unit.maxHp, unit.hp + action.amount) }
            : unit
        ),
        credits: state.credits - action.cost,
      };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, null, () => {
    const map = generateMap(MAP_DEPTH);
    return {
      squad: [],
      credits: INITIAL_CREDITS,
      currentLevel: 0,
      currentNodeId: null,
      map: map,
      screen: 'MAP' as GameScreen,
    };
  });

  const travel = useCallback((nodeId: string) => {
    dispatch({ type: 'TRAVEL', nodeId });
  }, []);

  const recruit = useCallback((unit: Unit, cost: number) => {
    dispatch({ type: 'RECRUIT', unit, cost });
  }, []);

  const resolveBattle = useCallback((xpGain: number, creditsGain: number, hpLosses: Record<string, number>) => {
    dispatch({ type: 'RESOLVE_BATTLE', xpGain, creditsGain, hpLosses });
  }, []);

  const healUnit = useCallback((unitId: string, amount: number, cost: number = 0) => {
    dispatch({ type: 'HEAL_UNIT', unitId, amount, cost });
  }, []);

  return {
    state,
    travel,
    recruit,
    resolveBattle,
    healUnit,
  };
}
