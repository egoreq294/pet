import { removeToken } from "../tokenService/index.js";

export const logout = async (refreshToken) => {
  const token = await removeToken(refreshToken);
  return token;
};
