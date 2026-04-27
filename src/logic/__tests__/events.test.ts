import { describe, it, expect } from 'vitest';
import { getRandomEvent, GAME_EVENTS } from '../events';

describe('events logic', () => {
  it('should return a random event from GAME_EVENTS', () => {
    const event = getRandomEvent();
    expect(GAME_EVENTS).toContain(event);
  });
});
