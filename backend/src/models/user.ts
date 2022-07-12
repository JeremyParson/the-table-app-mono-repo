import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    passwordDigest: { type: String },
    dateCreated: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  { toJSON: { virtuals: true } }
);

UserSchema.virtual("campaigns", {
  ref: "Campaign",
  localField: "_id",
  foreignField: "players",
});

UserSchema.virtual("characters", {
  ref: "Character",
  localField: "_id",
  foreignField: "player",
});

export default UserSchema;
