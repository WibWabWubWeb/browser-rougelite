import { describe, it, expect } from 'vitest';
import { calculateDamage } from '../combat';
import { UnitType } from '../../types/game';

describe('calculateDamage', () => {
  it('should deal 2x damage for Thermal vs Plating', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Plating, 10)).toBe(20);
  });

  it('should deal 2x damage for Thermal vs Bio', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Bio, 10)).toBe(20);
  });

  it('should deal 0.5x damage for Thermal vs Shields (floored)', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Shields, 10)).toBe(5);
    expect(calculateDamage(UnitType.Thermal, UnitType.Shields, 11)).toBe(5);
  });

  it('should deal 2x damage for Ion vs Shields', () => {
    expect(calculateDamage(UnitType.Ion, UnitType.Shields, 10)).toBe(20);
  });

  it('should deal 0.5x damage for Ion vs Plating (floored)', () => {
    expect(calculateDamage(UnitType.Ion, UnitType.Plating, 10)).toBe(5);
    expect(calculateDamage(UnitType.Ion, UnitType.Plating, 11)).toBe(5);
  });

  it('should deal 2x damage for Toxic vs Bio', () => {
    expect(calculateDamage(UnitType.Toxic, UnitType.Bio, 10)).toBe(20);
  });

  it('should deal 0.5x damage for Toxic vs Shields (floored)', () => {
    expect(calculateDamage(UnitType.Toxic, UnitType.Shields, 10)).toBe(5);
    expect(calculateDamage(UnitType.Toxic, UnitType.Shields, 11)).toBe(5);
  });

  it('should deal 1x damage for neutral matchups (Thermal vs Ion)', () => {
    expect(calculateDamage(UnitType.Thermal, UnitType.Ion, 10)).toBe(10);
  });

  it('should deal 1x damage for neutral matchups (Ion vs Bio)', () => {
    expect(calculateDamage(UnitType.Ion, UnitType.Bio, 10)).toBe(10);
  });

  it('should deal 1x damage for neutral matchups (Toxic vs Plating)', () => {
    expect(calculateDamage(UnitType.Toxic, UnitType.Plating, 10)).toBe(10);
  });
});
