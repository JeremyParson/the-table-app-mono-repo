require("dotenv").config();
import mongoose from "mongoose";
import CampaignSchema from "./campaign";
import CharacterSchema from './character';
import HandoutSchema from './handout';
import UserSchema from './user';

mongoose.connect(process.env.MONGO_URI).then((_v) => {
  console.log(`Connected to mongoDB`);
});

const Campaign = mongoose.model('Campaign', CampaignSchema)
const Character = mongoose.model('Character', CharacterSchema)
const Handout = mongoose.model('Handout', HandoutSchema)
const User = mongoose.model('User', UserSchema)

export {Campaign, Character, Handout, User};
