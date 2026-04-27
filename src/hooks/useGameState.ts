import { useReducer, useCallback } from 'react';
import type { Unit, MapNode } from "../types/game";
import { NodeType, UnitType } from '../types/game';
import { generateMap } from '../logic/map';

export type GameScreen = 'MAP' | 'BATTLE' | 'SHOP' | 'LEVEL_UP' | 'EVENT';

export interface GameState {
  squad: Unit[];
  credits: number;
  currentLevel: number;
  currentNodeId: string | null;
  map: MapNode[];
  screen: GameScreen;
  lastBattleLeveledUnits: string[]; // Track which units leveled up in the last battle
}

export type GameAction =
  | { type: 'TRAVEL'; nodeId: string }
  | { type: 'RECRUIT'; unit: Unit; cost: number }
  | { type: 'RESOLVE_BATTLE'; xpGain: number; creditsGain: number; updatedHPs: Record<string, number> }
  | { type: 'HEAL_UNIT'; unitId: string; amount: number; cost: number }
  | { type: 'UPGRADE_UNIT'; unitId: string; upgrade: { atk?: number; maxHp?: number; milestone?: string } }
  | { type: 'CLOSE_LEVEL_UP' };

const INITIAL_CREDITS = 100;
const MAP_DEPTH = 6;

const INITIAL_SQUAD: Unit[] = [
  {
    id: 'p1',
    name: 'Interceptor',
    type: UnitType.Thermal,
    hp: 40,
    maxHp: 40,
    atk: 10,
    speed: 15,
    level: 1,
    xp: 0,
    xpToNext: 20,
    milestones: [],
  },
  {
    id: 'p2',
    name: 'Bastion',
    type: UnitType.Plating,
    hp: 60,
    maxHp: 60,
    atk: 6,
    speed: 5,
    level: 1,
    xp: 0,
    xpToNext: 20,
    milestones: [],
  },
  {
    id: 'p3',
    name: 'Volt-Raider',
    type: UnitType.Ion,
    hp: 35,
    maxHp: 35,
    atk: 12,
    speed: 10,
    level: 1,
    xp: 0,
    xpToNext: 20,
    milestones: [],
  },
];

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
      const leveledUnitIds: string[] = [];
      const updatedSquad = state.squad.map(unit => {
        const newHp = action.updatedHPs[unit.id] !== undefined
          ? Math.max(0, action.updatedHPs[unit.id])
          : unit.hp;
        
        let newXp = unit.xp + action.xpGain;
        let newLevel = unit.level;
        let newXpToNext = unit.xpToNext;

        while (newXp >= newXpToNext) {
          newXp -= newXpToNext;
          newLevel += 1;
          newXpToNext = Math.floor(newXpToNext * 1.5);
          if (!leveledUnitIds.includes(unit.id)) {
            leveledUnitIds.push(unit.id);
          }
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
        lastBattleLeveledUnits: leveledUnitIds,
        screen: leveledUnitIds.length > 0 ? 'LEVEL_UP' : 'MAP',
      };
    }

    case 'UPGRADE_UNIT':
      return {
        ...state,
        squad: state.squad.map(unit => {
          if (unit.id !== action.unitId) return unit;
          return {
            ...unit,
            atk: unit.atk + (action.upgrade.atk || 0),
            maxHp: unit.maxHp + (action.upgrade.maxHp || 0),
            hp: unit.hp + (action.upgrade.maxHp || 0), // Heal for the HP gain
            milestones: action.upgrade.milestone 
              ? [...unit.milestones, action.upgrade.milestone]
              : unit.milestones,
          };
        }),
      };

    case 'CLOSE_LEVEL_UP':
      return {
        ...state,
        screen: 'MAP',
        lastBattleLeveledUnits: [],
      };

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
      squad: INITIAL_SQUAD,
      credits: INITIAL_CREDITS,
      currentLevel: 0,
      currentNodeId: null,
      map: map,
      screen: 'MAP' as GameScreen,
      lastBattleLeveledUnits: [],
    };
  });

  const travel = useCallback((nodeId: string) => {
    dispatch({ type: 'TRAVEL', nodeId });
  }, []);

  const recruit = useCallback((unit: Unit, cost: number) => {
    dispatch({ type: 'RECRUIT', unit, cost });
  }, []);

  const resolveBattle = useCallback((xpGain: number, creditsGain: number, updatedHPs: Record<string, number>) => {
    dispatch({ type: 'RESOLVE_BATTLE', xpGain, creditsGain, updatedHPs });
  }, []);

  const healUnit = useCallback((unitId: string, amount: number, cost: number = 0) => {
    dispatch({ type: 'HEAL_UNIT', unitId, amount, cost });
  }, []);

  const upgradeUnit = useCallback((unitId: string, upgrade: { atk?: number; maxHp?: number; milestone?: string }) => {
    dispatch({ type: 'UPGRADE_UNIT', unitId, upgrade });
  }, []);

  const closeLevelUp = useCallback(() => {
    dispatch({ type: 'CLOSE_LEVEL_UP' });
  }, []);

  return {
    state,
    travel,
    recruit,
    resolveBattle,
    healUnit,
    upgradeUnit,
    closeLevelUp,
  };
}
