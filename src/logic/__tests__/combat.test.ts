import { describe, it, expect } from 'vitest';
import { calculateDamage } from '../combat';
import { UnitType } from '../../types/game';

/**
 * THE LOOP:
 * Thermal -> Plating -> Toxic -> Bio -> Ion -> Shields -> Thermal
 */
describe('calculateDamage (Balanced 6-Way Star Cycle)', () => {
  // Strengths (Next in loop)
  it('Thermal should be strong vs Plating (2x)', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Plating, 10)).toBe(20);
  });
  it('Plating should be strong vs Toxic (2x)', () => {
    expect(calculateDamage(UnitType.Plating, UnitType.Toxic, 10)).toBe(20);
  });
  it('Toxic should be strong vs Bio (2x)', () => {
    expect(calculateDamage(UnitType.Toxic, UnitType.Bio, 10)).toBe(20);
  });
  it('Bio should be strong vs Ion (2x)', () => {
    expect(calculateDamage(UnitType.Bio, UnitType.Ion, 10)).toBe(20);
  });
  it('Ion should be strong vs Shields (2x)', () => {
    expect(calculateDamage(UnitType.Ion, UnitType.Shields, 10)).toBe(20);
  });
  it('Shields should be strong vs Thermal (2x)', () => {
    expect(calculateDamage(UnitType.Shields, UnitType.Thermal, 10)).toBe(20);
  });

  // Weaknesses (Previous in loop)
  it('Thermal should be weak vs Shields (0.5x)', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Shields, 10)).toBe(5);
  });
  it('Plating should be weak vs Thermal (0.5x)', () => {
    expect(calculateDamage(UnitType.Plating, UnitType.Thermal, 10)).toBe(5);
  });
  it('Toxic should be weak vs Plating (0.5x)', () => {
    expect(calculateDamage(UnitType.Toxic, UnitType.Plating, 10)).toBe(5);
  });
  it('Bio should be weak vs Toxic (0.5x)', () => {
    expect(calculateDamage(UnitType.Bio, UnitType.Toxic, 10)).toBe(5);
  });
  it('Ion should be weak vs Bio (0.5x)', () => {
    expect(calculateDamage(UnitType.Ion, UnitType.Bio, 10)).toBe(5);
  });
  it('Shields should be weak vs Ion (0.5x)', () => {
    expect(calculateDamage(UnitType.Shields, UnitType.Ion, 10)).toBe(5);
  });

  // Neutral examples
  it('Thermal should be neutral vs Toxic (1x)', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Toxic, 10)).toBe(10);
  });
  it('Ion should be neutral vs Thermal (1x)', () => {
    expect(calculateDamage(UnitType.Ion, UnitType.Thermal, 10)).toBe(10);
  });
});
