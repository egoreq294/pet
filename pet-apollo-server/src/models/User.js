import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    avatar: { url: { type: String }, name: { type: String } },
  },
  { timestamps: true }
);

export const User = model("user", userSchema);
