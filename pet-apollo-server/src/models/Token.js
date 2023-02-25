import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

export default model("token", TokenSchema);
