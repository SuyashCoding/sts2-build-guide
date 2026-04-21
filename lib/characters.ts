export interface Build {
  id: string;
  name: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  color: string;
  tagline1: string;
  tagline2: string;
  startingHp: number;
  startingGold: number;
  startingRelic: string;
  relicDescription: string;
  builds: Build[];
}

export const characters: Character[] = [
  {
    id: "ironclad",
    name: "Ironclad",
    color: "ironclad",
    tagline1: "The last soldier of the Ironclads.",
    tagline2: "Crushes foes with sword and flame against his will.",
    startingHp: 80,
    startingGold: 99,
    startingRelic: "Burning Blood",
    relicDescription: "At the end of combat, heal 6 HP.",
    builds: [
      {
        id: "overview",
        name: "Character Overview",
        description: "General tips and playstyle",
      },
      {
        id: "strength",
        name: "Strength Build",
        description: "Stack Strength, hit hard",
      },
      {
        id: "block",
        name: "Block/Barricade",
        description: "Retain block between turns",
      },
      {
        id: "exhaust",
        name: "Exhaust Build",
        description: "Exhaust cards for value",
      },
    ],
  },
  {
    id: "silent",
    name: "Silent",
    color: "silent",
    tagline1: "A huntress from outside the Spire.",
    tagline2: "Ready to stab and poison anything in her way.",
    startingHp: 70,
    startingGold: 99,
    startingRelic: "Ring of the Snake",
    relicDescription: "At the start of each combat, draw 2 additional cards.",
    builds: [
      {
        id: "overview",
        name: "Character Overview",
        description: "General tips and playstyle",
      },
      {
        id: "poison",
        name: "Poison Build",
        description: "Stack Poison and survive",
      },
      {
        id: "shiv",
        name: "Shiv Build",
        description: "Generate and buff Shivs",
      },
      {
        id: "discard",
        name: "Discard Build",
        description: "Discard for powerful effects",
      },
    ],
  },
  {
    id: "necrobinder",
    name: "Necrobinder",
    color: "necrobinder",
    tagline1: "A spireborn lich who seeks revenge.",
    tagline2: "Call upon her trusty left hand, Osty, in combat.",
    startingHp: 66,
    startingGold: 99,
    startingRelic: "Soulbound Phylactery",
    relicDescription: "Whenever a minion dies, gain 1 Strength.",
    builds: [
      {
        id: "overview",
        name: "Character Overview",
        description: "General tips and playstyle",
      },
      {
        id: "minion",
        name: "Minion Build",
        description: "Flood the field with the undead",
      },
      {
        id: "drain",
        name: "Drain Build",
        description: "Siphon enemy HP to fuel your own",
      },
    ],
  },
  {
    id: "regent",
    name: "Regent",
    color: "regent",
    tagline1: "Hier to the throne of Stars.",
    tagline2: "Wields cosmic power but his minions do the work.",
    startingHp: 75,
    startingGold: 150,
    startingRelic: "Divine Right",
    relicDescription: "At the start of each combat, gain three Stars.",
    builds: [
      {
        id: "overview",
        name: "Character Overview",
        description: "General tips and playstyle",
      },
      {
        id: "gold",
        name: "Gold Build",
        description: "Leverage gold for card effects",
      },
      {
        id: "relic",
        name: "Relic Synergy",
        description: "Maximize relic interactions",
      },
    ],
  },
  {
    id: "defect",
    name: "Defect",
    color: "defect",
    tagline1: "An automaton eternally modifying itself to survive.",
    tagline2: "Deploys Orb technology when it must fight.",
    startingHp: 75,
    startingGold: 99,
    startingRelic: "Cracked Core",
    relicDescription: "At the start of each combat, Channel 1 Lightning.",
    builds: [
      {
        id: "overview",
        name: "Character Overview",
        description: "General tips and playstyle",
      },
      {
        id: "lightning",
        name: "Lightning Build",
        description: "Stack and evoke Lightning orbs",
      },
      {
        id: "frost",
        name: "Frost/Focus",
        description: "Block with Frost, scale with Focus",
      },
      {
        id: "plasma",
        name: "Plasma Build",
        description: "Infinite energy via Plasma orbs",
      },
    ],
  },
];

export function getCharacter(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}
