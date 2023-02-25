import { Token } from "../../models/Token.js";

export const removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });
  return tokenData;
};
