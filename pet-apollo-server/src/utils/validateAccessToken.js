import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET } from "../constants.js";

export const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, JWT_ACCESS_SECRET);
    return userData;
  } catch {
    return null;
  }
};
