import { useReducer, useCallback } from 'react';
import type { Unit, MapNode, ShopItem } from "../types/game";
import { NodeType } from '../types/game';
import { generateMap } from '../logic/map';

export type GameScreen = 'MAP' | 'BATTLE' | 'SHOP' | 'LEVEL_UP' | 'EVENT' | 'DRAFT';

export interface GameState {
  squad: Unit[];
  inventory: ShopItem[];
  credits: number;
  currentLevel: number;
  currentNodeId: string | null;
  map: MapNode[];
  screen: GameScreen;
  lastBattleLeveledUnits: string[]; // Track which units leveled up in the last battle
}

export type GameAction =
  | { type: 'TRAVEL'; nodeId: string }
  | { type: 'RECRUIT'; unit: Unit; cost: number; replaceIndex?: number }
  | { type: 'RESOLVE_BATTLE'; xpGain: number; creditsGain: number; updatedHPs: Record<string, number> }
  | { type: 'HEAL_UNIT'; unitId: string; amount: number; cost: number }
  | { type: 'UPGRADE_UNIT'; unitId: string; upgrade: { atk?: number; maxHp?: number; milestone?: string } }
  | { type: 'CLOSE_LEVEL_UP' }
  | { type: 'CHOOSE_SQUAD'; squad: Unit[] }
  | { type: 'REORDER_SQUAD'; squad: Unit[] }
  | { type: 'BUY_ITEM'; item: ShopItem }
  | { type: 'USE_ITEM'; itemId: string; targetUnitId: string }
  | { type: 'EQUIP_MODULE'; item: ShopItem; targetUnitId: string };

const INITIAL_CREDITS = 100;
const MAP_DEPTH = 6;

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CHOOSE_SQUAD':
      return {
        ...state,
        squad: action.squad,
        screen: 'MAP',
      };

    case 'REORDER_SQUAD': {
      return {
        ...state,
        squad: action.squad,
      };
    }

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

    case 'RECRUIT': {
      let newSquad = [...state.squad];
      if (action.replaceIndex !== undefined && action.replaceIndex >= 0 && action.replaceIndex < newSquad.length) {
        newSquad[action.replaceIndex] = action.unit;
      } else {
        newSquad.push(action.unit);
      }
      return {
        ...state,
        squad: newSquad,
        credits: state.credits - action.cost,
      };
    }

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

    case 'BUY_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, action.item],
        credits: state.credits - action.item.cost,
      };

    case 'USE_ITEM': {
      const itemIndex = state.inventory.findIndex(i => i.id === action.itemId);
      if (itemIndex === -1) return state;

      const item = state.inventory[itemIndex];
      const newInventory = [...state.inventory];
      newInventory.splice(itemIndex, 1);

      return {
        ...state,
        inventory: newInventory,
        squad: state.squad.map(unit => {
          if (unit.id !== action.targetUnitId) return unit;
          
          let newHp = unit.hp;
          if (item.effect?.hp) {
            newHp = Math.min(unit.maxHp, unit.hp + item.effect.hp);
          }
          // Assuming other consumable effects could go here, but only HP is mentioned/tested for now.

          return { ...unit, hp: newHp };
        }),
      };
    }

    case 'EQUIP_MODULE': {
      const itemIndex = state.inventory.findIndex(i => i.id === action.item.id);
      if (itemIndex === -1) return state;

      const newInventory = [...state.inventory];
      newInventory.splice(itemIndex, 1);

      return {
        ...state,
        inventory: newInventory,
        squad: state.squad.map(unit => {
          if (unit.id !== action.targetUnitId) return unit;
          
          return {
            ...unit,
            atk: unit.atk + (action.item.effect?.atk || 0),
            maxHp: unit.maxHp + (action.item.effect?.maxHp || 0),
            hp: unit.hp + (action.item.effect?.maxHp || 0), // also heal if maxHP increases
          };
        }),
      };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, null, () => {
    const map = generateMap(MAP_DEPTH);
    return {
      squad: [],
      inventory: [],
      credits: INITIAL_CREDITS,
      currentLevel: 0,
      currentNodeId: null,
      map: map,
      screen: 'DRAFT' as GameScreen,
      lastBattleLeveledUnits: [],
    };
  });

  const travel = useCallback((nodeId: string) => {
    dispatch({ type: 'TRAVEL', nodeId });
  }, []);

  const recruit = useCallback((unit: Unit, cost: number, replaceIndex?: number) => {
    dispatch({ type: 'RECRUIT', unit, cost, replaceIndex });
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

  const chooseSquad = useCallback((squad: Unit[]) => {
    dispatch({ type: 'CHOOSE_SQUAD', squad });
  }, []);

  const reorderSquad = useCallback((squad: Unit[]) => {
    dispatch({ type: 'REORDER_SQUAD', squad });
  }, []);

  const buyItem = useCallback((item: ShopItem) => {
    dispatch({ type: 'BUY_ITEM', item });
  }, []);

  const useItem = useCallback((itemId: string, targetUnitId: string) => {
    dispatch({ type: 'USE_ITEM', itemId, targetUnitId });
  }, []);

  const equipModule = useCallback((item: ShopItem, targetUnitId: string) => {
    dispatch({ type: 'EQUIP_MODULE', item, targetUnitId });
  }, []);

  return {
    state,
    travel,
    recruit,
    resolveBattle,
    healUnit,
    upgradeUnit,
    closeLevelUp,
    chooseSquad,
    reorderSquad,
    buyItem,
    useItem,
    equipModule,
  };
}