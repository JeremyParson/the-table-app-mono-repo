import Mongoose, { Schema } from "mongoose";

const CharacterSchema = new Schema({
  name: String,
  player: {type: Schema.Types.ObjectId},
  level: { type: Number, min: 1, max: 20 },
  experience: Number,
  race: String,
  classes: Array,
  alignment: String,
  inspiration: Number,

  armorClass: Number,
  speed: Number,
  initiative: Number,

  currentHitPoints: Number,
  hitPointMaximum: Number,
  temporaryHitPoints: Number,
  hitDiceMaximum: String,
  currentHitDice: String,

  strength: { type: Number, min: 1, max: 20 },
  dexterity: { type: Number, min: 1, max: 20 },
  constitution: { type: Number, min: 1, max: 20 },
  intelligence: { type: Number, min: 1, max: 20 },
  wisdom: { type: Number, min: 1, max: 20 },
  charisma: { type: Number, min: 1, max: 20 },

  strengthSave: Boolean,
  dexteritySave: Boolean,
  constitutionSave: Boolean,
  intelligenceSave: Boolean,
  wisdomSave: Boolean,
  charismaSave: Boolean,

  skills: [String],

  backgroundName: String,
  personalTraits: String,
  ideals: String,
  bonds: String,
  flaws: String,

  bonus: Number,
  proficiencies: [String],

  featuresAndTraits: [String],

  backstory: String,
  characterImage: String,

  allyName: String,
  allyImage: String,

  treasure: String,

  failedDeathSaves: Number,
  succeededDeathSaves: Number,

  equipment: [
    {
      name: String,
      damage: String,
      type: String,
    },
  ],

  campaigns: [{
    type: Mongoose.Types.ObjectId,
    ref: "Campaign",
  }],

  gmNotes: String,
  creator: {type: Schema.Types.ObjectId, required: true}
});

export default CharacterSchema;
