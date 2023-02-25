import { Token } from "../../models/Token.js";

export const findToken = async (refreshToken) => {
  const tokenData = await Token.findOne({ refreshToken });
  return tokenData;
};
