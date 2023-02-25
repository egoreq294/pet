import { ApiError } from "../../exceptions/index.js";
import {
  validateRefreshToken,
  findToken,
  saveToken,
  generateTokens,
} from "../tokenService/index.js";
import { User } from "../../models/User.js";

export const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);

  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const user = await User.findById(userData._id);

  const tokens = generateTokens({ _id: user._id });

  await saveToken(user._id, tokens.refreshToken);

  return { ...tokens };
};
