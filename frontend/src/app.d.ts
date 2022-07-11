type Campaign = {
  description: string;
  portrait: string;
  title: string;
  _id: string;
  error?: string;
};

type User = {
  _id: string;
  username: string;
  email: string;
};

type Character = {
  _id: string;
  name: string;
  player: string;
  level: number;
  experience: number;
  race: string;
  classes: Array<string>;
  alignment: string;
  inspiration: number;

  armorClass: number;
  speed: number;
  initiative: number;

  currentHitPoints: number;
  hitPointMaximum: number;
  temporaryHitPoints: number;
  hitDiceMaximum: string;
  currentHitDice: string;

  strength: { type: number; min: 1; max: 20 };
  dexterity: { type: number; min: 1; max: 20 };
  constitution: { type: number; min: 1; max: 20 };
  intelligence: { type: number; min: 1; max: 20 };
  wisdom: { type: number; min: 1; max: 20 };
  charisma: { type: number; min: 1; max: 20 };

  strengthSave: boolean;
  dexteritySave: boolean;
  constitutionSave: boolean;
  intelligenceSave: boolean;
  wisdomSave: boolean;
  charismaSave: boolean;

  skills: [string];

  backgroundName: string;
  personalTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;

  bonus: number;
  proficiencies: Array<string>;

  featuresAndTraits: Array<string>;

  backstory: string;
  characterImage: string;

  allyName: string;
  allyImage: string;

  treasure: string;

  failedDeathSaves: number;
  succeededDeathSaves: number;

  equipment: [
    {
      name: string;
      damage: string;
      type: string;
    }
  ];

  campaigns: Array<string>;

  gmNotes: string;
  creator: string;
  public: string;
  error?: string;
};

type ResponseError = {
  error: string;
};

type Handout = {
  _id: string;
  name: string;
  image: string;
  description: string;
  gmNotes: string;
  players: Array<string>;
  campaign: string
  creator: string;
  error?: string;
};
