import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

export const Token = model("token", tokenSchema);
