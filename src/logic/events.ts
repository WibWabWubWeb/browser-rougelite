import type { GameEvent } from '../types/game';
import { AttackType, ArmorType } from '../types/game';

export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'spider-plague',
    title: 'Space Spider Plague',
    prompt: 'A colony of space spiders has infested a nearby derelict station. They are spreading fast. Will you intervene?',
    choices: [
      {
        id: 'exterminate',
        label: 'Exterminate',
        description: 'Send a unit to clear the infestation.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Thermal,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'thermal-success',
              text: 'The thermal weapons incinerated the spiders with ease. The station is clear!',
              xp: 50,
              credits: 50
            }
          },
          {
            atkType: AttackType.Toxic,
            chanceOverride: 0.0,
            outcomeOverride: {
              id: 'toxic-failure',
              text: 'The spiders are immune to toxins! They swarmed your unit, causing severe damage.',
              hp: -50
            }
          }
        ],
        outcomes: [
          {
            id: 'exterminate-success',
            text: 'You successfully cleared the spiders.',
            xp: 30,
            chance: 0.3
          },
          {
            id: 'exterminate-failure',
            text: 'The spiders were too much. You had to retreat.',
            hp: -10,
            chance: 0.7
          }
        ]
      },
      {
        id: 'ignore',
        label: 'Ignore',
        description: 'Leave the spiders alone.',
        outcomes: [
          {
            id: 'ignore-nothing',
            text: 'You move on, leaving the infestation behind.'
          }
        ]
      }
    ]
  },
  {
    id: 'acid-nebula',
    title: 'Acid Nebula',
    prompt: 'A thick, corrosive nebula lies ahead. You must send a unit outside to repair a critical exterior sensor.',
    choices: [
      {
        id: 'repair',
        label: 'Repair Sensor',
        description: 'Send a unit to fix the sensor.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Plating,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'plating-success',
              text: 'The heavy plating resisted the corrosion. Sensor fixed!',
              xp: 40
            }
          },
          {
            defType: ArmorType.Bio,
            chanceOverride: 0.1,
            outcomeOverride: {
              id: 'bio-failure',
              text: 'The acidic mist was lethal to the organic components. The unit barely survived.',
              hp: -70
            }
          }
        ],
        outcomes: [
          {
            id: 'repair-success',
            text: 'You successfully repaired the sensor.',
            xp: 30,
            chance: 0.5
          },
          {
            id: 'repair-failure',
            text: 'The nebula was too corrosive. The unit took damage and failed.',
            hp: -30,
            chance: 0.5
          }
        ]
      },
      {
        id: 'bypass',
        label: 'Bypass',
        description: 'Navigate without the sensor.',
        outcomes: [
          {
            id: 'bypass-delay',
            text: 'You navigate slowly, losing some time but staying safe.'
          }
        ]
      }
    ]
  },
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
  },
  {
    id: 'ancient-data-core',
    title: 'Ancient Data Core',
    prompt: 'You discover a floating data core from an ancient civilization. Its encryption is formidable.',
    choices: [
      {
        id: 'decrypt',
        label: 'Attempt Decryption',
        description: 'Use a unit to break the code.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'ion-decrypt-success',
              text: 'The precision Ion pulses bypassed the security layers. A wealth of knowledge is yours!',
              xp: 100,
              credits: 50
            }
          }
        ],
        outcomes: [
          {
            id: 'decrypt-success',
            text: 'You successfully decrypted the core.',
            xp: 60,
            chance: 0.4
          },
          {
            id: 'decrypt-failure',
            text: 'The encryption triggered a feedback loop, damaging your unit.',
            hp: -20,
            chance: 0.6
          }
        ]
      },
      {
        id: 'salvage',
        label: 'Salvage for Parts',
        description: 'Break it down for raw materials.',
        outcomes: [
          {
            id: 'salvage-credits',
            text: 'You recovered some valuable scrap.',
            credits: 75
          }
        ]
      }
    ]
  },
  {
    id: 'rogue-ai-node',
    title: 'Rogue AI Node',
    prompt: 'A rogue AI has taken over a communications hub. It is broadcasting hostile code.',
    choices: [
      {
        id: 'neutralize',
        label: 'Neutralize AI',
        description: 'Send a unit to disable the core.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ai-ion-success',
              text: 'The AI was short-circuited before it could react.',
              xp: 80
            }
          },
          {
            atkType: AttackType.Thermal,
            chanceOverride: 0.6,
            outcomeOverride: {
              id: 'ai-thermal-success',
              text: 'You melted the hardware, but some data was lost.',
              xp: 40,
              credits: 30
            }
          }
        ],
        outcomes: [
          {
            id: 'ai-success',
            text: 'The AI is offline.',
            xp: 50,
            chance: 0.5
          },
          {
            id: 'ai-failure',
            text: 'The AI counter-hacked your unit!',
            hp: -40,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'black-market-deal',
    title: 'Black Market Deal',
    prompt: 'A shadowy figure offers a strange experimental module for a high price.',
    choices: [
      {
        id: 'buy-exp',
        label: 'Buy Expertise',
        description: 'Pay 150 credits for combat training.',
        outcomes: [
          {
            id: 'buy-exp-success',
            text: 'Your squad feels much more capable.',
            credits: -150,
            xp: 150
          }
        ]
      },
      {
        id: 'haggle',
        label: 'Haggle',
        description: 'Try to get a better price.',
        outcomes: [
          {
            id: 'haggle-success',
            text: 'You got a discount!',
            credits: -100,
            xp: 150,
            chance: 0.4
          },
          {
            id: 'haggle-failure',
            text: 'The dealer was insulted and their bodyguards roughed you up.',
            hp: -15,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'crystalline-entity',
    title: 'Crystalline Entity',
    prompt: 'A massive, glowing crystal floats in the void, pulsing with rhythmic light.',
    choices: [
      {
        id: 'harvest',
        label: 'Harvest Shards',
        description: 'Use a unit to cut away valuable crystals.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Thermal,
            chanceOverride: 0.85,
            outcomeOverride: {
              id: 'thermal-harvest',
              text: 'The heat sliced through the crystal perfectly.',
              credits: 200
            }
          }
        ],
        outcomes: [
          {
            id: 'harvest-success',
            text: 'You managed to gather some shards.',
            credits: 120,
            chance: 0.5
          },
          {
            id: 'harvest-failure',
            text: 'The crystal shattered violently!',
            hp: -25,
            chance: 0.5
          }
        ]
      },
      {
        id: 'commune',
        label: 'Commune',
        description: 'Attempt to understand the pulses.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Bio,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'bio-commune',
              text: 'Your unit bonded with the entity, gaining profound insight.',
              xp: 120
            }
          }
        ],
        outcomes: [
          {
            id: 'commune-success',
            text: 'You felt a strange peace.',
            xp: 40,
            chance: 0.3
          },
          {
            id: 'commune-fail',
            text: 'The mental strain was too much.',
            hp: -10,
            chance: 0.7
          }
        ]
      }
    ]
  },
  {
    id: 'pirate-ambush',
    title: 'Pirate Ambush',
    prompt: 'You have been caught in a gravity well by pirate hunters! They demand all your credits.',
    choices: [
      {
        id: 'pay-toll',
        label: 'Pay the Toll',
        description: 'Hand over 50% of your credits.',
        outcomes: [
          {
            id: 'pay-toll-outcome',
            text: 'They let you go, laughing as they jump away.',
            credits: -200 // Mock value, assuming player has at least this much
          }
        ]
      },
      {
        id: 'fight-back',
        label: 'Fight Your Way Out',
        description: 'Aggressive maneuver to break the lock.',
        requiresUnitSelection: true,
        outcomes: [
          {
            id: 'fight-success',
            text: 'You destroyed their flagship and looted the remains!',
            credits: 300,
            xp: 50,
            chance: 0.3
          },
          {
            id: 'fight-failure',
            text: 'You escaped, but with heavy hull damage.',
            hp: -50,
            chance: 0.7
          }
        ]
      }
    ]
  },
  {
    id: 'bio-organic-growth',
    title: 'Bio-Organic Overgrowth',
    prompt: 'A derelict ship is covered in a pulsing, green moss that is eating through the hull.',
    choices: [
      {
        id: 'burn-it',
        label: 'Burn it Away',
        description: 'Send a unit to incinerate the growth.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Thermal,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'thermal-burn',
              text: 'The growth was completely vaporized.',
              xp: 60
            }
          }
        ],
        outcomes: [
          {
            id: 'burn-success',
            text: 'The moss is gone.',
            xp: 30,
            chance: 0.6
          },
          {
            id: 'burn-fail',
            text: 'The moss released spores as it died!',
            hp: -20,
            chance: 0.4
          }
        ]
      },
      {
        id: 'sample',
        label: 'Take Samples',
        description: 'A risky attempt to study the organism.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Bio,
            chanceOverride: 0.7,
            outcomeOverride: {
              id: 'bio-sample-success',
              text: 'The unit is naturally resistant to the spores. Great data!',
              xp: 150
            }
          }
        ],
        outcomes: [
          {
            id: 'sample-success',
            text: 'You secured a viable sample.',
            xp: 80,
            chance: 0.4
          },
          {
            id: 'sample-fail',
            text: 'The unit was consumed by the growth!',
            hp: -60,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'ancient-siphon',
    title: 'Ancient Siphon',
    prompt: 'A massive structure is siphoning energy from a nearby white dwarf.',
    choices: [
      {
        id: 'tap-in',
        label: 'Tap the Stream',
        description: 'Divert some energy to your own reserves.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'ion-tap',
              text: 'You stabilized the flow and gained massive power.',
              credits: 250
            }
          }
        ],
        outcomes: [
          {
            id: 'tap-success',
            text: 'You got some energy.',
            credits: 100,
            chance: 0.5
          },
          {
            id: 'tap-fail',
            text: 'The feedback loop nearly blew your engines!',
            hp: -30,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'mercenary-contract',
    title: 'Mercenary Contract',
    prompt: 'A local militia needs veterans to train their recruits.',
    choices: [
      {
        id: 'train-them',
        label: 'Lend an Expert',
        description: 'Send a unit to provide training.',
        requiresUnitSelection: true,
        outcomes: [
          {
            id: 'train-reward',
            text: 'They paid well for the expertise.',
            credits: 150,
            xp: 20
          }
        ]
      },
      {
        id: 'decline',
        label: 'Decline',
        description: 'Your units are needed elsewhere.',
        outcomes: [
          {
            id: 'decline-contract',
            text: 'You move on.'
          }
        ]
      }
    ]
  },
  {
    id: 'nanite-cloud',
    title: 'Nanite Cloud',
    prompt: 'A shimmering cloud of grey nanites is stripping the paint off your hull.',
    choices: [
      {
        id: 'corrupt-signal',
        label: 'Send Corrupt Signal',
        description: 'Try to disable them with a virus.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Toxic,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'toxic-nanite',
              text: 'The digital toxin dissolved their logic gates.',
              xp: 70
            }
          }
        ],
        outcomes: [
          {
            id: 'nanite-success',
            text: 'The cloud dispersed.',
            xp: 40,
            chance: 0.5
          },
          {
            id: 'nanite-fail',
            text: 'The nanites adapted and began eating the unit!',
            hp: -35,
            chance: 0.5
          }
        ]
      },
      {
        id: 'tank-it',
        label: 'Brace for Impact',
        description: 'Let the nanites finish their cycle.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Plating,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'plating-nanite',
              text: 'The heavy armor resisted the microscopic teeth.',
              hp: -5
            }
          }
        ],
        outcomes: [
          {
            id: 'tank-outcome',
            text: 'The hull is scarred but intact.',
            hp: -20
          }
        ]
      }
    ]
  },
  {
    id: 'alien-diplomat',
    title: 'Alien Diplomat',
    prompt: 'An escape pod contains a high-ranking official from a mysterious sect.',
    choices: [
      {
        id: 'save-them',
        label: 'Rescue and Escort',
        description: 'Bring them aboard.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Bio,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'bio-diplomat',
              text: 'The diplomat feels safe with your organic-oriented unit.',
              credits: 150,
              xp: 50
            }
          }
        ],
        outcomes: [
          {
            id: 'rescue-success',
            text: 'They reward you upon reaching safety.',
            credits: 80,
            chance: 0.7
          },
          {
            id: 'rescue-fail',
            text: 'The diplomat was actually an assassin!',
            hp: -30,
            chance: 0.3
          }
        ]
      }
    ]
  },
  {
    id: 'smugglers-stash',
    title: 'Smugglers Stash',
    prompt: 'You find a hidden compartment in an asteroid. It is trapped.',
    choices: [
      {
        id: 'disarm',
        label: 'Disarm Trap',
        description: 'Carefully remove the explosives.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'ion-disarm',
              text: 'A quick Ion burst fried the trigger.',
              credits: 300
            }
          }
        ],
        outcomes: [
          {
            id: 'disarm-success',
            text: 'You got the loot.',
            credits: 180,
            chance: 0.4
          },
          {
            id: 'disarm-fail',
            text: 'KABOOM.',
            hp: -45,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'ghost-signal',
    title: 'Ghost Signal',
    prompt: 'A signal from a supposedly dead ship is coming from inside a nebula.',
    choices: [
      {
        id: 'investigate',
        label: 'Investigate',
        description: 'Follow the signal.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'ion-ghost',
              text: 'You revealed the signal was a holographic trap.',
              xp: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'ghost-success',
            text: 'You found an old log with valuable coordinates.',
            xp: 60,
            chance: 0.4
          },
          {
            id: 'ghost-fail',
            text: 'You were ambushed by automated drones!',
            hp: -25,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'corrosive-rain',
    title: 'Corrosive Rain',
    prompt: 'A nearby gas giant is shedding its atmosphere in a localized storm.',
    choices: [
      {
        id: 'shield-up',
        label: 'Full Shields',
        description: 'Use your energy to block the rain.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Shields,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'shield-rain',
              text: 'The shields shimmered but held.',
              hp: 0
            }
          }
        ],
        outcomes: [
          {
            id: 'rain-damage',
            text: 'The hull is pitted and weakened.',
            hp: -15
          }
        ]
      }
    ]
  },
  {
    id: 'unstable-reactor',
    title: 'Unstable Reactor',
    prompt: 'A research station is about to go critical!',
    choices: [
      {
        id: 'stabilize',
        label: 'Stabilize Core',
        description: 'Use precise energy to calm the reaction.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Thermal,
            chanceOverride: 0.7,
            outcomeOverride: {
              id: 'thermal-reactor',
              text: 'You balanced the heat levels perfectly.',
              xp: 200
            }
          }
        ],
        outcomes: [
          {
            id: 'reactor-success',
            text: 'The station is saved.',
            xp: 100,
            chance: 0.3
          },
          {
            id: 'reactor-fail',
            text: 'You had to flee before it blew!',
            hp: -40,
            chance: 0.7
          }
        ]
      }
    ]
  },
  {
    id: 'memory-fragment',
    title: 'Memory Fragment',
    prompt: 'A piece of a shattered AI mind is drifting in space.',
    choices: [
      {
        id: 'integrate',
        label: 'Integrate Fragment',
        description: 'Add the code to a unit.',
        requiresUnitSelection: true,
        outcomes: [
          {
            id: 'integrate-success',
            text: 'The unit has gained new tactical insights.',
            xp: 150,
            chance: 0.5
          },
          {
            id: 'integrate-fail',
            text: 'The fragment was corrupted and damaged the unit.',
            hp: -20,
            xp: 50,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'toxin-leak',
    title: 'Toxin Leak',
    prompt: 'A gas canister from an old war has ruptured nearby.',
    choices: [
      {
        id: 'seal-it',
        label: 'Seal the Leak',
        description: 'Send a unit to patch the canister.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Bio,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'bio-toxin',
              text: 'The unit is immune to these toxins.',
              xp: 40
            }
          },
          {
            atkType: AttackType.Toxic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'toxic-toxin',
              text: 'The unit neutralized the gas with its own emitters.',
              xp: 60
            }
          }
        ],
        outcomes: [
          {
            id: 'toxin-success',
            text: 'The leak is stopped.',
            xp: 30,
            chance: 0.6
          },
          {
            id: 'toxin-fail',
            text: 'The unit inhaled a lethal dose.',
            hp: -50,
            chance: 0.4
          }
        ]
      }
    ]
  },
  {
    id: 'stowaway-bot',
    title: 'Stowaway Bot',
    prompt: 'You find a small, rusted robot hiding in the cargo hold.',
    choices: [
      {
        id: 'keep-it',
        label: 'Keep It',
        description: 'See if it can be useful.',
        outcomes: [
          {
            id: 'bot-credits',
            text: 'It knows where some stash is hidden!',
            credits: 100,
            chance: 0.5
          },
          {
            id: 'bot-sabotage',
            text: 'It was a spy bot and sabotaged your systems!',
            hp: -15,
            chance: 0.5
          }
        ]
      },
      {
        id: 'eject',
        label: 'Eject',
        description: 'No stowaways allowed.',
        outcomes: [
          {
            id: 'eject-bot',
            text: 'The bot is gone.'
          }
        ]
      }
    ]
  },
  {
    id: 'void-riddle',
    title: 'Void Riddle',
    prompt: 'An ancient satellite broadcasts a series of mathematical riddles.',
    choices: [
      {
        id: 'solve',
        label: 'Solve Riddle',
        description: 'Dedicate processing power to the answer.',
        outcomes: [
          {
            id: 'solve-success',
            text: 'Correct! The satellite unlocks a cache.',
            credits: 150,
            xp: 50,
            chance: 0.3
          },
          {
            id: 'solve-fail',
            text: 'Wrong answer. The satellite sends a shockwave.',
            hp: -10,
            chance: 0.7
          }
        ]
      }
    ]
  },
  {
    id: 'abandoned-station',
    title: 'Abandoned Station',
    prompt: 'A massive space station sits silent. Lights are flickering in the hangar.',
    choices: [
      {
        id: 'explore',
        label: 'Explore Hangar',
        description: 'Send a unit to scout.',
        requiresUnitSelection: true,
        outcomes: [
          {
            id: 'explore-credits',
            text: 'You found some abandoned tech.',
            credits: 120,
            chance: 0.5
          },
          {
            id: 'explore-trap',
            text: 'The hangar doors slammed shut and the air was vented!',
            hp: -30,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'ion-storm-surge',
    title: 'Ion Storm Surge',
    prompt: 'A violent Ion storm is brewing. Your systems are starting to fail.',
    choices: [
      {
        id: 'recalibrate',
        label: 'Recalibrate Systems',
        description: 'Send a unit to manually adjust the sensors.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ion-surge-success',
              text: 'The unit used its own Ion core to buffer the storm.',
              xp: 80
            }
          }
        ],
        outcomes: [
          {
            id: 'surge-success',
            text: 'You navigated safely.',
            xp: 40,
            chance: 0.6
          },
          {
            id: 'surge-fail',
            text: 'The storm fried your primary computer!',
            hp: -20,
            credits: -50,
            chance: 0.4
          }
        ]
      }
    ]
  },
  {
    id: 'lethal-void-leak',
    title: 'Lethal Void Leak',
    prompt: 'A micro-meteorite has punched a hole through the main reactor shielding. Lethal radiation is leaking. Someone must manually close the emergency shutters.',
    choices: [
      {
        id: 'seal-leak',
        label: 'Seal the Leak',
        description: 'A high-risk manual operation.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Plating,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'plating-leak-success',
              text: 'The thick plating absorbed the radiation. Leak sealed!',
              xp: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'leak-success',
            text: 'You sealed the leak just in time.',
            xp: 50,
            chance: 0.8
          },
          {
            id: 'leak-lethal',
            text: 'The radiation was too intense. The unit succumbed while closing the shutters.',
            removeUnit: true,
            chance: 0.2
          }
        ]
      }
    ]
  },
  {
    id: 'experimental-prototype',
    title: 'Experimental Prototype',
    prompt: 'You discover a pristine laboratory ship drifting in the void. Inside, an experimental weapon module sits on a pedestal.',
    choices: [
      {
        id: 'take-prototype',
        label: 'Take Prototype',
        description: 'Claim the experimental module.',
        outcomes: [
          {
            id: 'prototype-success',
            text: 'You secured the prototype!',
            item: {
              id: 'exp-thermal-1',
              name: 'Solar Flare Core',
              category: 'module',
              cost: 250,
              description: 'Increases Thermal damage by 20%.',
              effect: { type: 'stat', stat: 'atk', value: 5 }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'abandoned-nursery',
    title: 'Abandoned Nursery',
    prompt: 'An old bio-research station contains a single viable incubation pod. Something is moving inside.',
    choices: [
      {
        id: 'hatch-it',
        label: 'Hatch Pod',
        description: 'See what survived.',
        outcomes: [
          {
            id: 'nursery-new-unit',
            text: 'A small, bio-engineered scout emerged and bonded with your squad!',
            newUnit: {
              id: 'bio-scout-1',
              name: 'Viper Hatchling',
              atkType: AttackType.Toxic,
              defType: ArmorType.Bio,
              hp: 60,
              maxHp: 60,
              atk: 12,
              speed: 15,
              level: 1,
              xp: 0,
              xpToNext: 100,
              milestones: []
            },
            chance: 0.7
          },
          {
            id: 'nursery-empty',
            text: 'The pod was empty, but you salvaged some organic components.',
            credits: 50,
            chance: 0.3
          }
        ]
      }
    ]
  },
  {
    id: 'crashed-escape-pod',
    title: 'Crashed Escape Pod',
    prompt: 'A civilian escape pod has crash-landed on a nearby moon. A lone survivor is broadcasting a distress signal.',
    choices: [
      {
        id: 'rescue-survivor',
        label: 'Rescue Survivor',
        description: 'Bring them aboard.',
        outcomes: [
          {
            id: 'rescue-recruit',
            text: 'The survivor is a veteran engineer who offers to join your squad!',
            newUnit: {
              id: 'unit-recruit-1',
              name: 'Veteran Engineer',
              atkType: AttackType.Ion,
              defType: ArmorType.Plating,
              hp: 100,
              maxHp: 100,
              atk: 8,
              speed: 10,
              level: 2,
              xp: 0,
              xpToNext: 200,
              milestones: []
            },
            chance: 0.6
          },
          {
            id: 'rescue-credits',
            text: 'The survivor thanks you and pays for passage to the next station.',
            credits: 200,
            chance: 0.4
          }
        ]
      }
    ]
  },
  {
    id: 'weapon-test-range',
    title: 'Weapon Test Range',
    prompt: 'You stumble into an automated weapon test range. Drones are firing live rounds at anything that moves.',
    choices: [
      {
        id: 'brave-range',
        label: 'Brave the Fire',
        description: 'Try to reach the salvage at the center.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Shields,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'shields-test-success',
              text: 'The shields deflected the testing rounds. You found a powerful module!',
              item: {
                id: 'mod-shield-1',
                name: 'Reactive Plating',
                category: 'module',
                cost: 180,
                description: 'Grants 10% damage reduction.',
                effect: { type: 'stat', stat: 'hp', value: 20 }
              }
            }
          }
        ],
        outcomes: [
          {
            id: 'test-success',
            text: 'You made it through and found some credits.',
            credits: 150,
            chance: 0.5
          },
          {
            id: 'test-damage',
            text: 'The unit was battered by the tests.',
            hp: -40,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'black-market-prototype',
    title: 'Black Market Prototype',
    prompt: 'A shady trader offers you an "unstable but powerful" experimental bot.',
    choices: [
      {
        id: 'buy-prototype',
        label: 'Buy for 200 Credits',
        description: 'A risky investment.',
        outcomes: [
          {
            id: 'buy-bot-success',
            text: 'The bot is functional and terrifyingly efficient!',
            credits: -200,
            newUnit: {
              id: 'proto-bot-1',
              name: 'Prototype-X',
              atkType: AttackType.Thermal,
              defType: ArmorType.Shields,
              hp: 80,
              maxHp: 80,
              atk: 25,
              speed: 12,
              level: 3,
              xp: 0,
              xpToNext: 400,
              milestones: []
            },
            chance: 0.8
          },
          {
            id: 'buy-bot-fail',
            text: 'The bot exploded as soon as you powered it up!',
            credits: -200,
            hp: -20,
            chance: 0.2
          }
        ]
      }
    ]
  },
  {
    id: 'ancient-cryo-chamber',
    title: 'Ancient Cryo-Chamber',
    prompt: 'A hidden vault contains a single cryo-chamber from a forgotten era. The occupant is still alive.',
    choices: [
      {
        id: 'awaken',
        label: 'Awaken Occupant',
        description: 'A delicate procedure.',
        outcomes: [
          {
            id: 'cryo-new-unit',
            text: 'A legendary warrior awakens and pledges their service!',
            newUnit: {
              id: 'unit-legend-1',
              name: 'Ancient Guardian',
              atkType: AttackType.Ion,
              defType: ArmorType.Plating,
              hp: 150,
              maxHp: 150,
              atk: 18,
              speed: 8,
              level: 5,
              xp: 0,
              xpToNext: 1000,
              milestones: []
            },
            chance: 0.4
          },
          {
            id: 'cryo-xp',
            text: 'The occupant did not survive, but their neural logs provided massive tactical data.',
            xp: 300,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'wrecked-science-vessel',
    title: 'Wrecked Science Vessel',
    prompt: 'A science vessel was destroyed while testing a new module. The remains are still glowing.',
    choices: [
      {
        id: 'salvage-science',
        label: 'Salvage Module',
        description: 'Send a unit to retrieve the tech.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ion-science-success',
              text: 'The unit used Ion pulses to stabilize the debris. Module recovered!',
              item: {
                id: 'mod-ion-1',
                name: 'Ion Fluxer',
                category: 'module',
                cost: 200,
                description: 'Doubles Ion effect chance.',
                effect: { type: 'stat', stat: 'atk', value: 10 }
              }
            }
          }
        ],
        outcomes: [
          {
            id: 'science-success',
            text: 'You found a useful item.',
            item: {
              id: 'cons-repair-1',
              name: 'Emergency Nano-Kit',
              category: 'consumable',
              cost: 50,
              description: 'Restores 50 HP to a unit.',
              effect: { type: 'heal', value: 50 }
            },
            chance: 0.6
          },
          {
            id: 'science-damage',
            text: 'The debris exploded!',
            hp: -30,
            chance: 0.4
          }
        ]
      }
    ]
  },
  {
    id: 'lethal-security-grid',
    title: 'Lethal Security Grid',
    prompt: 'A vault containing ancient wealth is protected by a lethal laser grid. One wrong move means certain death.',
    choices: [
      {
        id: 'breach-vault',
        label: 'Breach Vault',
        description: 'High risk, high reward.',
        requiresUnitSelection: true,
        outcomes: [
          {
            id: 'vault-success',
            text: 'You bypassed the lasers and claimed the riches!',
            credits: 500,
            xp: 100,
            chance: 0.3
          },
          {
            id: 'vault-lethal',
            text: 'The security grid was perfect. The unit was vaporized.',
            removeUnit: true,
            chance: 0.2
          },
          {
            id: 'vault-failure',
            text: 'You tripped the alarm and had to flee empty-handed.',
            hp: -20,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'automated-factory',
    title: 'Automated Factory',
    prompt: 'An abandoned factory is still churning out combat bots. One seems to be malfunctioning and is following you.',
    choices: [
      {
        id: 'repair-bot',
        label: 'Repair and Recalibrate',
        description: 'Try to fix the bot.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ion-repair-success',
              text: 'A few Ion bursts reset its logic. It is now loyal to you!',
              newUnit: {
                id: 'factory-bot-1',
                name: 'Factory Drone',
                atkType: AttackType.Thermal,
                defType: ArmorType.Plating,
                hp: 90,
                maxHp: 90,
                atk: 14,
                speed: 11,
                level: 2,
                xp: 0,
                xpToNext: 200,
                milestones: []
              }
            }
          }
        ],
        outcomes: [
          {
            id: 'repair-success',
            text: 'The bot is fixed!',
            newUnit: {
              id: 'factory-bot-1',
              name: 'Factory Drone',
              atkType: AttackType.Thermal,
              defType: ArmorType.Plating,
              hp: 90,
              maxHp: 90,
              atk: 14,
              speed: 11,
              level: 2,
              xp: 0,
              xpToNext: 200,
              milestones: []
            },
            chance: 0.5
          },
          {
            id: 'repair-failure',
            text: 'The bot self-destructed!',
            hp: -25,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'toxic-spill',
    title: 'Toxic Spill',
    prompt: 'A transport ship leaked a massive cloud of neurotoxins. It is spreading towards your vents.',
    choices: [
      {
        id: 'neutralize-toxin',
        label: 'Neutralize Toxin',
        description: 'Send a specialist to spray a counter-agent.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Toxic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'toxic-neutralize',
              text: 'The unit used its own toxins to create a buffer. Safe!',
              xp: 50
            }
          }
        ],
        outcomes: [
          {
            id: 'toxin-safe',
            text: 'You managed to filter the air.',
            hp: -5,
            chance: 0.7
          },
          {
            id: 'toxin-lethal',
            text: 'The toxin was faster than expected. The unit collapsed.',
            removeUnit: true,
            chance: 0.1
          },
          {
            id: 'toxin-damage',
            text: 'Everyone is coughing, but alive.',
            hp: -30,
            chance: 0.2
          }
        ]
      }
    ]
  },
  {
    id: 'singularity-rift',
    title: 'Singularity Rift',
    prompt: 'A rift in space-time has opened. You can see a version of your own ship on the other side.',
    choices: [
      {
        id: 'reach-through',
        label: 'Reach Through',
        description: 'Try to pull something from the other side.',
        outcomes: [
          {
            id: 'rift-new-unit',
            text: 'A temporal duplicate of one of your crew jumped through!',
            newUnit: {
              id: 'unit-echo-1',
              name: 'Quantum Echo',
              atkType: AttackType.Ion,
              defType: ArmorType.Shields,
              hp: 110,
              maxHp: 110,
              atk: 15,
              speed: 14,
              level: 4,
              xp: 0,
              xpToNext: 800,
              milestones: []
            },
            chance: 0.3
          },
          {
            id: 'rift-lost',
            text: 'The rift collapsed, pulling a unit into the void!',
            removeUnit: true,
            chance: 0.1
          },
          {
            id: 'rift-item',
            text: 'You pulled out a strange, shifting object.',
            item: {
              id: 'mod-rift-1',
              name: 'Void Shard',
              category: 'module',
              cost: 300,
              description: 'Randomizes enemy attack types.',
              effect: { type: 'special' }
            },
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'derelict-supercarrier',
    title: 'Derelict Supercarrier',
    prompt: 'The massive hull of a destroyed supercarrier looms ahead. Its armory might still be intact.',
    choices: [
      {
        id: 'raid-armory',
        label: 'Raid Armory',
        description: 'Search for heavy weapons.',
        outcomes: [
          {
            id: 'armory-success',
            text: 'You found a high-grade military module!',
            item: {
              id: 'mod-heavy-1',
              name: 'Siege Battery',
              category: 'module',
              cost: 400,
              description: '+50% damage but -20% speed.',
              effect: { type: 'stat', stat: 'atk', value: 20 }
            },
            chance: 0.4
          },
          {
            id: 'armory-credits',
            text: 'You found some standard munitions.',
            credits: 200,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'ghost-in-the-machine',
    title: 'Ghost in the Machine',
    prompt: 'Your ship\'s computer has been haunted by a friendly AI fragment. It wants to help.',
    choices: [
      {
        id: 'give-body',
        label: 'Provide a Chassis',
        description: 'Download the AI into a spare drone.',
        outcomes: [
          {
            id: 'ai-join',
            text: 'The AI is thrilled to have a body and joins your squad!',
            newUnit: {
              id: 'unit-ai-1',
              name: 'AURA-7',
              atkType: AttackType.Ion,
              defType: ArmorType.Shields,
              hp: 75,
              maxHp: 75,
              atk: 20,
              speed: 18,
              level: 3,
              xp: 0,
              xpToNext: 400,
              milestones: []
            }
          }
        ]
      }
    ]
  },
  {
    id: 'asteroid-mines',
    title: 'Asteroid Mines',
    prompt: 'You find an automated mining colony. The extractors are still full of refined ore.',
    choices: [
      {
        id: 'loot-mines',
        label: 'Loot Extractors',
        description: 'Take the ore.',
        outcomes: [
          {
            id: 'mines-credits',
            text: 'You sold the ore for a tidy sum.',
            credits: 300,
            chance: 0.8
          },
          {
            id: 'mines-item',
            text: 'You found a specialized mining module.',
            item: {
              id: 'mod-mine-1',
              name: 'Drill Tip',
              category: 'module',
              cost: 150,
              description: 'Increases damage against Plating.',
              effect: { type: 'stat', stat: 'atk', value: 5 }
            },
            chance: 0.2
          }
        ]
      }
    ]
  },
  {
    id: 'combat-drone-swarm',
    title: 'Combat Drone Swarm',
    prompt: 'A swarm of ancient combat drones is protecting a supply cache.',
    choices: [
      {
        id: 'hack-swarm',
        label: 'Hack Swarm',
        description: 'Try to disable their security.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.85,
            outcomeOverride: {
              id: 'ion-hack-success',
              text: 'The swarm powered down. You claimed the cache!',
              item: {
                id: 'mod-drone-1',
                name: 'Drone Controller',
                category: 'module',
                cost: 250,
                description: 'Summons a helper drone in combat.',
                effect: { type: 'special' }
              }
            }
          }
        ],
        outcomes: [
          {
            id: 'hack-success',
            text: 'You got some credits.',
            credits: 200,
            chance: 0.5
          },
          {
            id: 'hack-fail',
            text: 'The drones attacked!',
            hp: -40,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'experimental-stealth-field',
    title: 'Experimental Stealth Field',
    prompt: 'A prototype stealth ship was abandoned. Its cloak is still active but flickering.',
    choices: [
      {
        id: 'retrieve-cloak',
        label: 'Retrieve Cloak',
        description: 'Send a unit into the shimmering field.',
        requiresUnitSelection: true,
        outcomes: [
          {
            id: 'cloak-success',
            text: 'You retrieved the stealth module!',
            item: {
              id: 'mod-stealth-1',
              name: 'Phase Shifter',
              category: 'module',
              cost: 350,
              description: 'Grants 20% dodge chance.',
              effect: { type: 'stat', stat: 'speed', value: 10 }
            },
            chance: 0.5
          },
          {
            id: 'cloak-failure',
            text: 'The field collapsed, crushing the unit!',
            hp: -60,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'cursed-relic',
    title: 'Cursed Relic',
    prompt: 'An ancient artifact pulses with a dark, malevolent energy. It whispers of power and death.',
    choices: [
      {
        id: 'touch-relic',
        label: 'Touch Relic',
        description: 'A terrifying risk.',
        requiresUnitSelection: true,
        outcomes: [
          {
            id: 'relic-power',
            text: 'The unit was filled with dark knowledge.',
            xp: 500,
            chance: 0.4
          },
          {
            id: 'relic-death',
            text: 'The relic consumed the unit\'s soul.',
            removeUnit: true,
            chance: 0.2
          },
          {
            id: 'relic-pain',
            text: 'The unit survived, but its mind is shattered.',
            hp: -50,
            xp: 100,
            chance: 0.4
          }
        ]
      }
    ]
  },
  {
    id: 'space-whale-graveyard',
    title: 'Space Whale Graveyard',
    prompt: 'A massive cluster of organic remains floats here. Some of the biology is still reactive.',
    choices: [
      {
        id: 'harvest-biology',
        label: 'Harvest Bio-Tech',
        description: 'Gather reactive tissue.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Bio,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'bio-harvest-success',
              text: 'The unit integrated the tissue perfectly!',
              item: {
                id: 'mod-bio-1',
                name: 'Reactive Tissue',
                category: 'module',
                cost: 220,
                description: 'Regenerates 5 HP per turn.',
                effect: { type: 'stat', stat: 'hp', value: 30 }
              }
            }
          }
        ],
        outcomes: [
          {
            id: 'harvest-success',
            text: 'You found some organic materials.',
            credits: 150,
            chance: 0.6
          },
          {
            id: 'harvest-fail',
            text: 'The tissue lashed out!',
            hp: -20,
            chance: 0.4
          }
        ]
      }
    ]
  },
  {
    id: 'quantum-echo-chamber',
    title: 'Quantum Echo Chamber',
    prompt: 'A station designed to study parallel universes is malfunctioning. It is pulling objects from other timelines.',
    choices: [
      {
        id: 'stabilize-portal',
        label: 'Stabilize Portal',
        description: 'Try to pull a useful item through.',
        outcomes: [
          {
            id: 'portal-new-unit',
            text: 'A strange warrior from another timeline stepped through!',
            newUnit: {
              id: 'unit-alt-1',
              name: 'Rift Walker',
              atkType: AttackType.Thermal,
              defType: ArmorType.Plating,
              hp: 120,
              maxHp: 120,
              atk: 16,
              speed: 9,
              level: 4,
              xp: 0,
              xpToNext: 800,
              milestones: []
            },
            chance: 0.3
          },
          {
            id: 'portal-item',
            text: 'A futuristic module fell through the rift.',
            item: {
              id: 'mod-quant-1',
              name: 'Quantum Battery',
              category: 'module',
              cost: 280,
              description: '+20 Max HP and +5 Attack.',
              effect: { type: 'stat', stat: 'hp', value: 20 }
            },
            chance: 0.7
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
