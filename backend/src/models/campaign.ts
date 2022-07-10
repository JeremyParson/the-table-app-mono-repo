import Mongoose, { Schema } from "mongoose";

const CampaignSchema = new Schema(
  {
    title: {type: String, required: true},
    portrait: String,
    description: String,
    creationDate: {type: Date, default: Date.now},
    creator: {type: Schema.Types.ObjectId, required: true},
    players: [Schema.Types.ObjectId],
    public: {type: Boolean, default: true}
  },
  { toJSON: { virtuals: true } }
);

CampaignSchema.virtual("characters", {
  ref: "Character",
  localField: "_id",
  foreignField: "campaigns",
});

CampaignSchema.virtual("handouts", {
  ref: "Handout",
  localField: "_id",
  foreignField: "campaign",
});

CampaignSchema.post("findOneAndDelete", async (doc) => {
  await Mongoose.model('Character').deleteMany({ campaign: doc._id });
});

export default CampaignSchema;
