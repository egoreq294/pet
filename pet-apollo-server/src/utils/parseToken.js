import { EMPTY_STRING } from "../constants.js";

export const parseToken = (token) => {
  return (token || EMPTY_STRING).replace(/Bearer\s?/, EMPTY_STRING);
};
