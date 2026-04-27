import { AttackType, ArmorType } from '../types/game';

/**
 * Calculates damage based on attacker and defender types using a 3x3 matrix.
 * 
 * THE MATRIX:
 * | ATK \ DEF | Plating | Shields | Bio     |
 * |-----------|---------|---------|---------|
 * | Thermal   | 2.0x    | 0.5x    | 1.0x    |
 * | Ion       | 1.0x    | 2.0x    | 0.5x    |
 * | Toxic     | 0.5x    | 1.0x    | 2.0x    |
 */
export function calculateDamage(
  attackerType: AttackType,
  defenderType: ArmorType,
  baseDamage: number
): number {
  const multipliers: Record<AttackType, Record<ArmorType, number>> = {
    [AttackType.Thermal]: {
      [ArmorType.Plating]: 2.0,
      [ArmorType.Shields]: 0.5,
      [ArmorType.Bio]: 1.0,
    },
    [AttackType.Ion]: {
      [ArmorType.Plating]: 1.0,
      [ArmorType.Shields]: 2.0,
      [ArmorType.Bio]: 0.5,
    },
    [AttackType.Toxic]: {
      [ArmorType.Plating]: 0.5,
      [ArmorType.Shields]: 1.0,
      [ArmorType.Bio]: 2.0,
    },
  };

  const multiplier = multipliers[attackerType][defenderType];
  return Math.floor(baseDamage * multiplier);
}
