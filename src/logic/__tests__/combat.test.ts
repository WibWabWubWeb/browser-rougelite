import { describe, it, expect } from 'vitest';
import { calculateDamage } from '../combat';
import { AttackType, ArmorType } from '../../types/game';

/**
 * THE MATRIX:
 * | ATK \ DEF | Plating | Shields | Bio     |
 * |-----------|---------|---------|---------|
 * | Thermal   | 2.0x    | 0.5x    | 1.0x    |
 * | Ion       | 1.0x    | 2.0x    | 0.5x    |
 * | Toxic     | 0.5x    | 1.0x    | 2.0x    |
 */
describe('calculateDamage (Decoupled 3x3 Matrix)', () => {
  // Thermal Attacks
  it('Thermal should be strong vs Plating (2.0x)', () => {
    expect(calculateDamage(AttackType.Thermal, ArmorType.Plating, 10)).toBe(20);
  });
  it('Thermal should be weak vs Shields (0.5x)', () => {
    expect(calculateDamage(AttackType.Thermal, ArmorType.Shields, 10)).toBe(5);
  });
  it('Thermal should be neutral vs Bio (1.0x)', () => {
    expect(calculateDamage(AttackType.Thermal, ArmorType.Bio, 10)).toBe(10);
  });

  // Ion Attacks
  it('Ion should be strong vs Shields (2.0x)', () => {
    expect(calculateDamage(AttackType.Ion, ArmorType.Shields, 10)).toBe(20);
  });
  it('Ion should be weak vs Bio (0.5x)', () => {
    expect(calculateDamage(AttackType.Ion, ArmorType.Bio, 10)).toBe(5);
  });
  it('Ion should be neutral vs Plating (1.0x)', () => {
    expect(calculateDamage(AttackType.Ion, ArmorType.Plating, 10)).toBe(10);
  });

  // Toxic Attacks
  it('Toxic should be strong vs Bio (2.0x)', () => {
    expect(calculateDamage(AttackType.Toxic, ArmorType.Bio, 10)).toBe(20);
  });
  it('Toxic should be weak vs Plating (0.5x)', () => {
    expect(calculateDamage(AttackType.Toxic, ArmorType.Plating, 10)).toBe(5);
  });
  it('Toxic should be neutral vs Shields (1.0x)', () => {
    expect(calculateDamage(AttackType.Toxic, ArmorType.Shields, 10)).toBe(10);
  });
});
