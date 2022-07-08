import Mongoose, { Schema } from "mongoose";

const HandoutSchema = new Schema({
  name: String,
  image: String,
  description: String,
  gmNotes: String,
  players: [Schema.Types.ObjectId],
  campaign: {
    type: Mongoose.Types.ObjectId,
    ref: "Campaign",
    required: true
  },
  creator: {type: Schema.Types.ObjectId, required: true},
});

export default HandoutSchema;
