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
            atkType: AttackType.Cryo,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'cryo-success',
              text: 'The absolute zero pulses froze the spiders mid-scuttle. Shattering them was trivial.',
              xp: 55,
              credits: 40
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
            defType: ArmorType.NanoFiber,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'nanofiber-success',
              text: 'The advanced nanofibers are completely inert to the acid. The repair was effortless.',
              xp: 60
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Prism,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'prism-brace',
              text: 'The Prismatic armor refracted the solar radiation harmlessly into space.',
              xp: 40
            }
          },
          {
            defType: ArmorType.Ceramic,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ceramic-brace',
              text: 'The high-grade ceramic heat shielding absorbed the brunt of the storm.',
              hp: -5
            }
          }
        ],
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'kinetic-help',
              text: 'Your unit used high-velocity kinetic rounds to shred the pirate hull from a distance.',
              xp: 40,
              credits: 60
            }
          }
        ],
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
          },
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'laser-decrypt-success',
              text: 'High-frequency laser pulses read the data faster than the encryption could rotate.',
              xp: 120,
              credits: 20
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
          },
          {
            atkType: AttackType.Laser,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'laser-harvest',
              text: 'Precision laser cutting harvested the purest shards without any waste.',
              credits: 300,
              xp: 20
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
          },
          {
            defType: ArmorType.Prism,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'prism-commune',
              text: 'The Prismatic armor resonated with the entity\'s frequency, creating a perfect harmonic link.',
              xp: 150,
              credits: 50
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
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'kinetic-fight',
              text: 'You punched through their shields with heavy kinetic slugs before they could react.',
              credits: 400,
              xp: 80
            }
          }
        ],
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
          },
          {
            atkType: AttackType.Cryo,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'cryo-freeze-moss',
              text: 'The moss was flash-frozen and shattered into harmless dust.',
              xp: 70
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
          },
          {
            atkType: AttackType.Cryo,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'cryo-nanite',
              text: 'The absolute zero pulses slowed the nanite replication to a crawl, allowing you to bypass them.',
              xp: 85
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
          },
          {
            defType: ArmorType.NanoFiber,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'nanofiber-nanite',
              text: 'The nanites recognized the advanced nanofibers as "one of their own" and left the unit untouched.',
              xp: 100
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
          },
          {
            defType: ArmorType.Prism,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'prism-diplomat',
              text: 'The diplomat is mesmerized by the Prismatic armor\'s light patterns and offers a generous gift.',
              credits: 250,
              xp: 30
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
          },
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'laser-disarm',
              text: 'A precision laser beam cut the detonator wire with micron accuracy.',
              credits: 250,
              xp: 20
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
          },
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.85,
            outcomeOverride: {
              id: 'laser-ghost',
              text: 'Your precision scanners used laser lidar to map the true geometry of the nebula, spotting the trap.',
              xp: 110
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
          },
          {
            defType: ArmorType.Ceramic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'ceramic-rain',
              text: 'The ceramic armor plates are completely immune to chemical corrosion. The rain slid right off.',
              xp: 50
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
          },
          {
            atkType: AttackType.Cryo,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'cryo-reactor',
              text: 'The Cryo pulses instantly stabilized the runaway thermal reaction.',
              xp: 250,
              credits: 100
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
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ion-integrate',
              text: 'The unit used precision Ion pulses to scrub the fragment of malware before integration.',
              xp: 200
            }
          }
        ],
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
            defType: ArmorType.NanoFiber,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'nanofiber-toxin',
              text: 'The non-porous nanofibers blocked the gas perfectly.',
              xp: 50
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ion-bot-reprogram',
              text: 'You used a low-power Ion burst to reset its factory settings. It knows where some loot is!',
              credits: 150,
              xp: 20
            }
          }
        ],
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'laser-riddle-solve',
              text: 'Your unit used high-speed laser optical computing to solve the riddle in milliseconds.',
              credits: 200,
              xp: 60
            }
          }
        ],
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
        unitRequirements: [
          {
            defType: ArmorType.Ceramic,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'ceramic-station-scout',
              text: 'The unit walked through a localized fire without a scratch, finding an old credit chip.',
              credits: 200,
              xp: 30
            }
          }
        ],
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
          },
          {
            defType: ArmorType.Shields,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'shields-surge-success',
              text: 'The advanced shielding absorbed the surge and converted it into auxiliary power.',
              xp: 90,
              credits: 30
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
          },
          {
            defType: ArmorType.Ceramic,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'ceramic-leak-success',
              text: 'The ceramic composite plates blocked the radiation perfectly. Leak sealed safely.',
              xp: 120
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Laser,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'laser-prototype-secure',
              text: 'Your unit used precise laser cutting to disable the pressure sensors on the pedestal.',
              item: {
                id: 'exp-laser-1',
                name: 'Focused Beam Core',
                category: 'module',
                cost: 300,
                description: 'Increases Laser damage by 25%.',
                effect: { type: 'stat', stat: 'atk', value: 8 }
              },
              xp: 50
            }
          }
        ],
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
          },
          {
            defType: ArmorType.Plating,
            chanceOverride: 0.7,
            outcomeOverride: {
              id: 'plating-test-success',
              text: 'The heavy plating took the hits like a champ. You salvaged some high-grade materials.',
              credits: 200,
              xp: 40
            }
          },
          {
            defType: ArmorType.NanoFiber,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'nanofiber-test-success',
              text: 'The unit\'s speed and small profile made it nearly impossible to hit. You reached the center easily.',
              credits: 150,
              xp: 100
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'ion-buy-fix',
              text: 'You used precision Ion pulses to stabilize the bot\'s core before activation. It works perfectly!',
              credits: -200,
              newUnit: {
                id: 'proto-bot-fixed',
                name: 'Stabilized Prototype',
                atkType: AttackType.Laser,
                defType: ArmorType.Prism,
                hp: 100,
                maxHp: 100,
                atk: 22,
                speed: 15,
                level: 3,
                xp: 0,
                xpToNext: 400,
                milestones: []
              }
            }
          }
        ],
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Cryo,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'cryo-awaken-success',
              text: 'Using controlled Cryo-pulses, you safely managed the thawing process. The legend lives!',
              newUnit: {
                id: 'unit-legend-cryo',
                name: 'Cryo-Guardian',
                atkType: AttackType.Cryo,
                defType: ArmorType.Ceramic,
                hp: 140,
                maxHp: 140,
                atk: 20,
                speed: 10,
                level: 4,
                xp: 0,
                xpToNext: 800,
                milestones: []
              }
            }
          }
        ],
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
          },
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'kinetic-science-success',
              text: 'You used a kinetic grapple to pull the module out of the wreck before it exploded.',
              item: {
                id: 'mod-kinetic-1',
                name: 'Impact Plate',
                category: 'module',
                cost: 220,
                description: 'Increases Kinetic damage by 15%.',
                effect: { type: 'stat', stat: 'atk', value: 6 }
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
        unitRequirements: [
          {
            defType: ArmorType.Prism,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'prism-vault-success',
              text: 'The Prismatic armor harmlessly refracted the security lasers. You walked right through.',
              credits: 600,
              xp: 150
            }
          }
        ],
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
          },
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.85,
            outcomeOverride: {
              id: 'laser-repair-success',
              text: 'You used a precision laser to weld the bot\'s damaged logic core. It\'s back online!',
              newUnit: {
                id: 'factory-bot-laser',
                name: 'Welded Drone',
                atkType: AttackType.Laser,
                defType: ArmorType.NanoFiber,
                hp: 80,
                maxHp: 80,
                atk: 16,
                speed: 14,
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
          },
          {
            defType: ArmorType.NanoFiber,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'nanofiber-neutralize',
              text: 'The unit used its nanofiber suit to physically absorb and filter the cloud.',
              xp: 70
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Cryo,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'cryo-rift-stabilize',
              text: 'You used Cryo-energy to freeze the rift open just long enough to grab some tech.',
              credits: 400,
              xp: 50
            }
          }
        ],
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'kinetic-armory-success',
              text: 'Your unit recognized the military kinetic weapon systems and recovered a rare barrel assembly.',
              item: {
                id: 'mod-kinetic-super',
                name: 'Hyper-Velocity Rail',
                category: 'module',
                cost: 500,
                description: 'Kinetic damage ignores 50% Plating.',
                effect: { type: 'special' }
              },
              xp: 100
            }
          }
        ],
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Laser,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'laser-ai-transfer',
              text: 'You used a high-speed laser uplink to transfer the AI without losing a single bit of data.',
              newUnit: {
                id: 'unit-ai-perfect',
                name: 'AURA-X',
                atkType: AttackType.Laser,
                defType: ArmorType.NanoFiber,
                hp: 100,
                maxHp: 100,
                atk: 24,
                speed: 20,
                level: 4,
                xp: 0,
                xpToNext: 800,
                milestones: []
              }
            }
          }
        ],
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'kinetic-mining-loot',
              text: 'Your unit used its kinetic drills to open the hardened extractors safely.',
              credits: 500,
              xp: 40
            }
          }
        ],
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
          },
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'laser-hack-success',
              text: 'You used a low-power laser to blind their sensors while you looted the cache.',
              credits: 400,
              xp: 50
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
        unitRequirements: [
          {
            defType: ArmorType.Prism,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'prism-stealth-success',
              text: 'The Prismatic armor stabilized the flickering field, allowing a safe retrieval.',
              item: {
                id: 'mod-stealth-prism',
                name: 'Prism Cloak',
                category: 'module',
                cost: 400,
                description: 'Grants invisibility for 1 turn.',
                effect: { type: 'special' }
              },
              xp: 80
            }
          }
        ],
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
        unitRequirements: [
          {
            defType: ArmorType.Bio,
            chanceOverride: 0.6,
            outcomeOverride: {
              id: 'bio-relic-survive',
              text: 'The unit\'s organic nature absorbed some of the curse as raw evolutionary energy.',
              xp: 400,
              hp: -20
            }
          }
        ],
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
          },
          {
            atkType: AttackType.Toxic,
            chanceOverride: 0.85,
            outcomeOverride: {
              id: 'toxic-harvest-success',
              text: 'You used specialized toxins to preserve the organic matter during transport.',
              credits: 300,
              xp: 50
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
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Ion,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'ion-portal-success',
              text: 'Precision Ion pulses locked the portal in place.',
              item: {
                id: 'mod-portal-1',
                name: 'Echo Core',
                category: 'module',
                cost: 350,
                description: 'Gains 10% XP bonus.',
                effect: { type: 'special' }
              }
            }
          }
        ],
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
  },
  {
    id: 'prismatic-reflection',
    title: 'Prismatic Reflection',
    prompt: 'A rogue security satellite is charging a massive orbital laser. It is locked onto your ship!',
    choices: [
      {
        id: 'deflect',
        label: 'Deflect Beam',
        description: 'Send a unit to intercept and reflect the beam.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Prism,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'prism-reflect-success',
              text: 'The Prismatic armor caught the beam and reflected it back at the satellite, destroying it instantly!',
              credits: 400,
              xp: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'reflect-success',
            text: 'You managed to tilt the ship, causing the beam to graze the shields.',
            hp: -15,
            chance: 0.4
          },
          {
            id: 'reflect-fail',
            text: 'The beam punched through! Direct hit!',
            hp: -60,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'magnetic-railgun-test',
    title: 'Magnetic Railgun Test',
    prompt: 'An abandoned military range is still active. A massive railgun is targeting floating debris nearby.',
    choices: [
      {
        id: 'hack-railgun',
        label: 'Reprogram Railgun',
        description: 'Use the railgun to destroy a nearby pirate stash.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'kinetic-railgun-success',
              text: 'Your unit understood the kinetic ballistics and scored a perfect hit on the stash!',
              credits: 600,
              xp: 50
            }
          }
        ],
        outcomes: [
          {
            id: 'railgun-success',
            text: 'The railgun fired, but missed the main cache.',
            credits: 100,
            chance: 0.5
          },
          {
            id: 'railgun-fail',
            text: 'The railgun misfired and hit your ship!',
            hp: -40,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'absolute-zero-pocket',
    title: 'Absolute Zero Pocket',
    prompt: 'You have entered a region of space where the temperature is dropping rapidly. Systems are seizing up.',
    choices: [
      {
        id: 'thermal-burst',
        label: 'Thermal Burst',
        description: 'Use a thermal weapon to heat the ship.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Thermal,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'thermal-warmth',
              text: 'The controlled thermal release kept the ship functional.',
              xp: 40
            }
          }
        ],
        outcomes: [
          {
            id: 'thermal-fail',
            text: 'The cold was too much. The engines stalled.',
            hp: -20,
            chance: 1.0
          }
        ]
      },
      {
        id: 'extra-insulation',
        label: 'Use Insulation',
        description: 'Send a unit to patch the most vulnerable areas.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.NanoFiber,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'nanofiber-cold-success',
              text: 'The nanofibers provided perfect thermal insulation. The unit worked comfortably in the cold.',
              xp: 80
            }
          },
          {
            atkType: AttackType.Cryo,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'cryo-cold-mastery',
              text: 'The Cryo-specialist harvested the ambient cold to supercharge their own weapon systems!',
              xp: 150,
              item: {
                id: 'mod-cryo-cold',
                name: 'Zero-Point Core',
                category: 'module',
                cost: 300,
                description: 'Cryo attacks deal 30% more damage.',
                effect: { type: 'stat', stat: 'atk', value: 10 }
              }
            }
          }
        ],
        outcomes: [
          {
            id: 'insulation-fail',
            text: 'The unit was nearly frozen solid!',
            hp: -40,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'heavy-ceramic-vault',
    title: 'Heavy Ceramic Vault',
    prompt: 'You find a vault covered in layers of ancient heat-shielding ceramic. No kinetic weapon can dent it.',
    choices: [
      {
        id: 'laser-cut',
        label: 'Laser Cut',
        description: 'Use a laser to melt through the shielding.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'laser-vault-success',
              text: 'The laser sliced through the ceramic like butter. The vault is yours!',
              credits: 800,
              xp: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'vault-fail',
            text: 'You couldn\'t even scratch the surface.',
            xp: 10,
            chance: 1.0
          }
        ]
      },
      {
        id: 'kinetic-brute-force',
        label: 'Brute Force',
        description: 'Try to smash it open.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 0.1,
            outcomeOverride: {
              id: 'kinetic-vault-luck',
              text: 'A lucky strike found a hairline fracture! The vault shattered!',
              credits: 500,
              xp: 200
            }
          }
        ],
        outcomes: [
          {
            id: 'kinetic-vault-fail',
            text: 'The kinetic rounds just bounced off, nearly hitting your own ship.',
            hp: -15,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'kinetic-impact-storm',
    title: 'Kinetic Impact Storm',
    prompt: 'A cloud of high-velocity micro-debris is ahead. It will shred standard hulls.',
    choices: [
      {
        id: 'tank-storm',
        label: 'Tank the Storm',
        description: 'Send a unit to protect the main thrusters.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Ceramic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'ceramic-storm-success',
              text: 'The ceramic composite plates pulverized the debris upon impact. No damage taken!',
              xp: 80
            }
          },
          {
            defType: ArmorType.Plating,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'plating-storm-success',
              text: 'The heavy plating took a beating, but the thrusters are safe.',
              hp: -10,
              xp: 40
            }
          }
        ],
        outcomes: [
          {
            id: 'storm-damage',
            text: 'The debris shredded the unit\'s exterior.',
            hp: -50,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'laser-comm-array',
    title: 'Laser Communication Array',
    prompt: 'A deep-space relay is out of alignment. Its laser transmitter is pointing at a nearby sun.',
    choices: [
      {
        id: 'realign',
        label: 'Realign Array',
        description: 'Send a unit to manually adjust the beam.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.9,
            outcomeOverride: {
              id: 'laser-align-success',
              text: 'Your unit used its own laser emitters to calibrate the relay perfectly.',
              xp: 120,
              credits: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'align-success',
            text: 'You managed to nudge it back into place.',
            xp: 50,
            chance: 0.6
          },
          {
            id: 'align-fail',
            text: 'The beam hit the ship as it rotated!',
            hp: -30,
            chance: 0.4
          }
        ]
      }
    ]
  },
  {
    id: 'cryo-preservation-leak',
    title: 'Cryo-Preservation Leak',
    prompt: 'A shipment of rare biological samples is thawing. If they reach room temperature, they will spoil.',
    choices: [
      {
        id: 'refreeze',
        label: 'Refreeze Samples',
        description: 'Use a unit to stabilize the temperature.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Cryo,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'cryo-refreeze-success',
              text: 'The Cryo-pulses perfectly re-stabilized the preservation field. The samples are saved!',
              credits: 500,
              xp: 50
            }
          }
        ],
        outcomes: [
          {
            id: 'refreeze-fail',
            text: 'The samples spoiled. What a waste.',
            xp: 10,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'nanofiber-weaving',
    title: 'NanoFiber Weaving',
    prompt: 'A critical structural support beam has cracked. You need a specialized repair.',
    choices: [
      {
        id: 'weave-repair',
        label: 'Weave Repair',
        description: 'Send a unit to use its armor fibers for the repair.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.NanoFiber,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'nanofiber-weave-success',
              text: 'The unit wove its advanced nanofibers into the crack, making the beam stronger than ever!',
              xp: 100,
              hp: 20 // Hull repair
            }
          }
        ],
        outcomes: [
          {
            id: 'weave-fail',
            text: 'A standard weld won\'t hold. The ship is less stable now.',
            hp: -10,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'prism-mirror-array',
    title: 'Prism Mirror Array',
    prompt: 'You find a derelict ship designed to focus stellar energy. Its mirror array is shattered.',
    choices: [
      {
        id: 'focus-energy',
        label: 'Focus Energy',
        description: 'Try to use the remaining mirrors to charge your ship.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Prism,
            chanceOverride: 0.95,
            outcomeOverride: {
              id: 'prism-focus-success',
              text: 'Your Prismatic armor acted as a perfect lens, focusing the energy directly into your ship.',
              credits: 400,
              xp: 80
            }
          },
          {
            atkType: AttackType.Laser,
            chanceOverride: 0.85,
            outcomeOverride: {
              id: 'laser-focus-success',
              text: 'You used your laser to create a guiding path for the stellar energy.',
              credits: 300,
              xp: 60
            }
          }
        ],
        outcomes: [
          {
            id: 'focus-success',
            text: 'You got a small charge.',
            credits: 100,
            chance: 0.5
          },
          {
            id: 'focus-fail',
            text: 'The unfocused light nearly blinded the crew!',
            hp: -10,
            chance: 0.5
          }
        ]
      }
    ]
  },
  {
    id: 'kinetic-demolition',
    title: 'Kinetic Demolition',
    prompt: 'A massive asteroid is on a collision course with a small mining colony. You can help.',
    choices: [
      {
        id: 'deflect-asteroid',
        label: 'Deflect Asteroid',
        description: 'Use heavy weapons to nudge it off course.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'kinetic-demo-success',
              text: 'The heavy kinetic slugs imparted enough momentum to move the asteroid safely away.',
              credits: 500,
              xp: 150
            }
          }
        ],
        outcomes: [
          {
            id: 'demo-success',
            text: 'You blew off a few chunks, enough to save the colony.',
            credits: 200,
            xp: 50,
            chance: 0.4
          },
          {
            id: 'demo-fail',
            text: 'You didn\'t have enough power. The colony was hit.',
            xp: -50,
            chance: 0.6
          }
        ]
      }
    ]
  },
  {
    id: 'ceramic-heat-sink',
    title: 'Ceramic Heat Sink',
    prompt: 'A station is located inside a volcanic moon. The heat is extreme.',
    choices: [
      {
        id: 'enter-station',
        label: 'Enter Station',
        description: 'Send a unit to retrieve data from the core.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Ceramic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'ceramic-heat-success',
              text: 'The ceramic armor plates handled the thousands of degrees without warping. Success!',
              xp: 150,
              credits: 200
            }
          }
        ],
        outcomes: [
          {
            id: 'heat-damage',
            text: 'The unit\'s systems melted in the extreme heat!',
            hp: -70,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'cryo-stasis-rescue',
    title: 'Cryo-Stasis Rescue',
    prompt: 'You rescued a high-priority target, but their life support is failing. They need to be kept cold.',
    choices: [
      {
        id: 'stasis-assist',
        label: 'Assist Stasis',
        description: 'Send a unit to maintain the target\'s temperature.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Cryo,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'cryo-rescue-success',
              text: 'Your unit maintained the target at perfect stasis levels until you reached safety.',
              credits: 700,
              xp: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'rescue-fail',
            text: 'The target thawed too early and didn\'t make it.',
            xp: 20,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'laser-tripwire-maze',
    title: 'Laser Tripwire Maze',
    prompt: 'A vault is guarded by a dense maze of visible laser tripwires.',
    choices: [
      {
        id: 'walk-through',
        label: 'Walk Through',
        description: 'Send a unit to navigate the maze.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.Prism,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'prism-maze-success',
              text: 'The Prismatic armor absorbed and refracted the tripwire beams, making the sensors believe nobody was there!',
              credits: 500,
              xp: 100
            }
          },
          {
            defType: ArmorType.NanoFiber,
            chanceOverride: 0.8,
            outcomeOverride: {
              id: 'nanofiber-maze-success',
              text: 'The unit\'s extreme flexibility allowed it to contort through the maze effortlessly.',
              credits: 400,
              xp: 80
            }
          }
        ],
        outcomes: [
          {
            id: 'maze-fail',
            text: 'A tripwire was hit! Automated turrets opened fire!',
            hp: -40,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'nano-swarm-reconstruction',
    title: 'Nano-Swarm Reconstruction',
    prompt: 'A cloud of "builder" nanites is drifting aimlessly. They are looking for a template.',
    choices: [
      {
        id: 'provide-template',
        label: 'Provide Template',
        description: 'Send a unit to interface with the swarm.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            defType: ArmorType.NanoFiber,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'nanofiber-template-success',
              text: 'The builder nanites recognized the advanced nanofibers and began duplicating them, repairing the unit!',
              hp: 50,
              xp: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'template-fail',
            text: 'The nanites didn\'t understand the unit\'s structure and began dismantling it for parts!',
            hp: -30,
            chance: 1.0
          }
        ]
      }
    ]
  },
  {
    id: 'kinetic-recoil-calibration',
    title: 'Kinetic Recoil Calibration',
    prompt: 'A massive explosion has sent your ship spinning. You need to stabilize.',
    choices: [
      {
        id: 'use-recoil',
        label: 'Use Weapon Recoil',
        description: 'Send a unit to fire its weapons in specific bursts to counter the spin.',
        requiresUnitSelection: true,
        unitRequirements: [
          {
            atkType: AttackType.Kinetic,
            chanceOverride: 1.0,
            outcomeOverride: {
              id: 'kinetic-stabilize-success',
              text: 'The heavy recoil from the kinetic rounds acted like perfect thrusters, stabilizing the ship.',
              xp: 100
            }
          }
        ],
        outcomes: [
          {
            id: 'stabilize-fail',
            text: 'The bursts were poorly timed, making the spin even worse!',
            hp: -20,
            chance: 1.0
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
