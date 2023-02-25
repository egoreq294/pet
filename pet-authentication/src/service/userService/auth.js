import bcrypt from "bcrypt";
import { User } from "../../models/User.js";
import { ApiError } from "../../exceptions/ApiError.js";
import { generateTokens, saveToken } from "../tokenService/index.js";

export const auth = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest("Неверный логин или пароль");
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user._doc.passwordHash
  );

  if (!isValidPassword) {
    throw ApiError.BadRequest("Неверный логин или пароль");
  }

  const tokens = generateTokens({ _id: user._id });
  await saveToken(user._id, tokens.refreshToken);

  return { ...tokens, userId: user._doc._id };
};
