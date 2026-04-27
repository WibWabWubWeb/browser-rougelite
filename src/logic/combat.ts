import { UnitType } from '../types/game';

/**
 * Calculates damage based on attacker and defender types using a balanced 6-way Star Cycle.
 * 
 * THE LOOP:
 * Thermal -> Plating -> Toxic -> Bio -> Ion -> Shields -> Thermal
 * 
 * Each type deals:
 * - 2.0x damage to the next type in the loop (Strength)
 * - 0.5x damage to the previous type in the loop (Weakness/Resisted)
 * - 1.0x damage otherwise (Neutral)
 */
export function calculateDamage(
  attackerType: UnitType,
  defenderType: UnitType,
  baseDamage: number
): number {
  const multipliers: Record<UnitType, { strong: UnitType; weak: UnitType }> = {
    [UnitType.Thermal]: { strong: UnitType.Plating, weak: UnitType.Shields },
    [UnitType.Plating]: { strong: UnitType.Toxic, weak: UnitType.Thermal },
    [UnitType.Toxic]: { strong: UnitType.Bio, weak: UnitType.Plating },
    [UnitType.Bio]: { strong: UnitType.Ion, weak: UnitType.Toxic },
    [UnitType.Ion]: { strong: UnitType.Shields, weak: UnitType.Bio },
    [UnitType.Shields]: { strong: UnitType.Thermal, weak: UnitType.Ion },
  };

  const effect = multipliers[attackerType];
  let multiplier = 1;

  if (defenderType === effect.strong) {
    multiplier = 2;
  } else if (defenderType === effect.weak) {
    multiplier = 0.5;
  }

  return Math.floor(baseDamage * multiplier);
}
