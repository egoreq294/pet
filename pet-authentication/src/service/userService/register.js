import bcrypt from "bcrypt";
import { User } from "../../models/User.js";
import { ApiError } from "../../exceptions/ApiError.js";
import { generateTokens, saveToken } from "../tokenService/index.js";

export const register = async ({ email, password, fullName }) => {
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    throw ApiError.BadRequest("Пользователь с таким email уже существует");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new User({
    email,
    fullName,
    passwordHash,
  });
  const user = await doc.save();

  const tokens = generateTokens({ _id: user._id });
  await saveToken(user._id, tokens.refreshToken);

  return { ...tokens, userId: user._doc._id };
};
