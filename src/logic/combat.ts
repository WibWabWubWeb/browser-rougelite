import { AttackType, ArmorType } from '../types/game';

/**
 * Calculates damage based on attacker and defender types using a 6x6 matrix.
 * 
 * Every attack type has 2 Strong (2.0x), 2 Weak (0.5x), and 1 Neutral (1.0x) relationship (plus itself).
 * 
 * THE MATRIX:
 * | ATK \ DEF    | Plating | Shields | Bio     | Ceramic | Prism   | NanoFiber |
 * |--------------|---------|---------|---------|---------|---------|-----------|
 * | Thermal      | 2.0x    | 0.5x    | 1.0x    | 0.5x    | 1.0x    | 2.0x      |
 * | Ion          | 1.0x    | 2.0x    | 0.5x    | 1.0x    | 0.5x    | 2.0x      |
 * | Toxic        | 0.5x    | 1.0x    | 2.0x    | 2.0x    | 1.0x    | 0.5x      |
 * | Kinetic      | 0.5x    | 2.0x    | 1.0x    | 1.0x    | 2.0x    | 0.5x      |
 * | Laser        | 1.0x    | 0.5x    | 2.0x    | 2.0x    | 0.5x    | 1.0x      |
 * | Cryo         | 2.0x    | 1.0x    | 0.5x    | 0.5x    | 2.0x    | 1.0x      |
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
      [ArmorType.Ceramic]: 0.5,
      [ArmorType.Prism]: 1.0,
      [ArmorType.NanoFiber]: 2.0,
    },
    [AttackType.Ion]: {
      [ArmorType.Plating]: 1.0,
      [ArmorType.Shields]: 2.0,
      [ArmorType.Bio]: 0.5,
      [ArmorType.Ceramic]: 1.0,
      [ArmorType.Prism]: 0.5,
      [ArmorType.NanoFiber]: 2.0,
    },
    [AttackType.Toxic]: {
      [ArmorType.Plating]: 0.5,
      [ArmorType.Shields]: 1.0,
      [ArmorType.Bio]: 2.0,
      [ArmorType.Ceramic]: 2.0,
      [ArmorType.Prism]: 1.0,
      [ArmorType.NanoFiber]: 0.5,
    },
    [AttackType.Kinetic]: {
      [ArmorType.Plating]: 0.5,
      [ArmorType.Shields]: 2.0,
      [ArmorType.Bio]: 1.0,
      [ArmorType.Ceramic]: 1.0,
      [ArmorType.Prism]: 2.0,
      [ArmorType.NanoFiber]: 0.5,
    },
    [AttackType.Laser]: {
      [ArmorType.Plating]: 1.0,
      [ArmorType.Shields]: 0.5,
      [ArmorType.Bio]: 2.0,
      [ArmorType.Ceramic]: 2.0,
      [ArmorType.Prism]: 0.5,
      [ArmorType.NanoFiber]: 1.0,
    },
    [AttackType.Cryo]: {
      [ArmorType.Plating]: 2.0,
      [ArmorType.Shields]: 1.0,
      [ArmorType.Bio]: 0.5,
      [ArmorType.Ceramic]: 0.5,
      [ArmorType.Prism]: 2.0,
      [ArmorType.NanoFiber]: 1.0,
    },
  };

  const multiplier = multipliers[attackerType][defenderType];
  return Math.floor(baseDamage * multiplier);
}
