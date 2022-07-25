type Campaign = {
  description: string;
  portrait: string;
  title: string;
  _id: string;
  error?: string;
  players?: [string];
};

type Message = {
  sender: string;
  content: string;
  sessionId: string;
  token: string;
};

type User = {
  _id: string;
  username: string;
  email: string;
};

type Race = {
  name: string;
  speed: string;
  age: string;
  size: string;
  size_description: string;
  alignment: string;
  ability_bonuses: [
    {
      ability_score: {
        index: string;
        name: string;
      };
      bonus: number;
    }
  ];
};

type Character = {
  _id: string;
  name: string;
  player: string;
  level: number;
  experience: number;
  race: string;
  class: string;
  alignment: string;
  inspiration: number;

  armorClass: string;
  speed: string;
  initiative: string;

  currentHitPoints: number;
  hitPointMaximum: number;
  temporaryHitPoints: number;
  hitDiceMaximum: string;
  currentHitDice: string;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  strengthSave: boolean;
  dexteritySave: boolean;
  constitutionSave: boolean;
  intelligenceSave: boolean;
  wisdomSave: boolean;
  charismaSave: boolean;

  skills: string;

  backgroundName: string;
  personalTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;

  bonus: number;
  proficiencies: string;

  featuresAndTraits: string;

  backstory: string;
  characterImage: string;

  allyName: string;
  allyImage: string;

  treasure: string;

  failedDeathSaves: number;
  succeededDeathSaves: number;

  equipment: string;

  campaigns: Array<string>;

  gmNotes: string;
  creator: string;
  public: boolean;
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
  campaign: string;
  creator: string;
  error?: string;
};

type Class = {
  name: string;
  hit_die: number;
  proficiency_choices: [
    {
      choose: number;
      type: string;
      from: [
        {
          index: string;
          name: string;
          url: string;
        }
      ];
    }
  ];
  proficiencies: [
    {
      index: string;
      name: string;
      url: string;
    }
  ];
  saving_throws: [
    {
      index: string;
      name: string;
      url: string;
    }
  ];
  starting_equipment: [
    {
      equipment: {
        index: string;
        name: string;
        url: string;
      };
      quantity: number;
    }
  ];
  starting_equipment_options: [
    {
      choose: number;
      type: string;
      from: [
        {
          equipment: {
            index: string;
            name: string;
            url: string;
          };
          quantity: number;
        }
      ];
    },
    {
      choose: number;
      type: string;
      from: [
        {
          equipment: {
            index: string;
            name: string;
            url: string;
          };
          quantity: number;
        },
        {
          equipment_option: {
            choose: number;
            type: string;
            from: {
              equipment_category: {
                index: string;
                name: string;
                url: string;
              };
            };
          };
        }
      ];
    }
  ];
};

type SelectedClass = {
  name: string;
  hit_die: number;
  starting_proficiencies: [
    {
      index: string;
      name: string;
      url: string;
    }
  ];
  selected_proficiencies: [string];
  saving_throws: [
    {
      index: string;
      name: string;
      url: string;
    }
  ];
};
