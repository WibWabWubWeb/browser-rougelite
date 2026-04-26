import { UnitType } from '../types/game';

/**
 * Calculates damage based on attacker and defender types using the Star Cycle.
 * Thermal counters Plating and Bio, resisted by Shields.
 * Ion counters Shields, resisted by Plating.
 * Toxic counters Bio, resisted by Shields.
 * 
 * @param attackerType The type of the unit dealing damage
 * @param defenderType The type of the unit receiving damage
 * @param baseDamage The raw damage value before multipliers
 * @returns The final damage value, floored
 */
export function calculateDamage(
  attackerType: UnitType,
  defenderType: UnitType,
  baseDamage: number
): number {
  let multiplier = 1;

  if (attackerType === UnitType.Thermal) {
    if (defenderType === UnitType.Plating || defenderType === UnitType.Bio) {
      multiplier = 2;
    } else if (defenderType === UnitType.Shields) {
      multiplier = 0.5;
    }
  } else if (attackerType === UnitType.Ion) {
    if (defenderType === UnitType.Shields) {
      multiplier = 2;
    } else if (defenderType === UnitType.Plating) {
      multiplier = 0.5;
    }
  } else if (attackerType === UnitType.Toxic) {
    if (defenderType === UnitType.Bio) {
      multiplier = 2;
    } else if (defenderType === UnitType.Shields) {
      multiplier = 0.5;
    }
  }

  return Math.floor(baseDamage * multiplier);
}
