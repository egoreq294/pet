import { logout as logoutService } from "../../service/index.js";

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutService(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (e) {
    next(e);
  }
};
