import { refresh as refreshService } from "../../service/index.js";

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const tokens = await refreshService(refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ accessToken: tokens.accessToken });
  } catch (e) {
    next(e);
  }
};
