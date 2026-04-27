import { GameEvent } from '../types/game';

export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'abandoned-freighter',
    title: 'Abandoned Freighter',
    prompt: 'You encounter a drifting freighter. Its hull is intact but there are no life signs.',
    choices: [
      {
        id: 'scavenge',
        label: 'Scavenge',
        description: 'Search the ship for useful materials.',
        outcomes: [
          {
            id: 'scavenge-success',
            text: 'You find a cache of credits.',
            credits: 100
          }
        ]
      },
      {
        id: 'leave',
        label: 'Leave',
        description: 'Ignore the ship and move on.',
        outcomes: [
          {
            id: 'leave-nothing',
            text: 'You leave the freighter behind.'
          }
        ]
      }
    ]
  },
  {
    id: 'solar-storm',
    title: 'Solar Storm',
    prompt: 'A sudden solar storm threatens your ship. Do you overclock your shields or brace for impact?',
    choices: [
      {
        id: 'overclock',
        label: 'Overclock Shields',
        description: 'Divert power to shields (Cost: 50 credits).',
        outcomes: [
          {
            id: 'overclock-success',
            text: 'The shields hold firm, but the energy drain was costly.',
            credits: -50
          }
        ]
      },
      {
        id: 'brace',
        label: 'Brace',
        description: 'Prepare for hull damage.',
        outcomes: [
          {
            id: 'brace-damage',
            text: 'The storm batters the hull.',
            hp: -10
          }
        ]
      }
    ]
  },
  {
    id: 'merchant-distress',
    title: 'Merchant Distress',
    prompt: 'A merchant ship is under attack by pirates. Will you intervene?',
    choices: [
      {
        id: 'help',
        label: 'Help',
        description: 'Drive off the pirates.',
        outcomes: [
          {
            id: 'help-reward',
            text: 'The merchant is grateful and shares some expertise.',
            xp: 20
          }
        ]
      },
      {
        id: 'ignore',
        label: 'Ignore',
        description: 'Avoid the conflict.',
        outcomes: [
          {
            id: 'ignore-nothing',
            text: 'You slip away while the pirates are occupied.'
          }
        ]
      }
    ]
  }
];

export function getRandomEvent(): GameEvent {
  const index = Math.floor(Math.random() * GAME_EVENTS.length);
  return GAME_EVENTS[index];
}
