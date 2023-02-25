import jwt from "jsonwebtoken";

import { JWT_REFRESH_SECRET } from "../../constants.js";

export const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, JWT_REFRESH_SECRET);
    return userData;
  } catch {
    return null;
  }
};
