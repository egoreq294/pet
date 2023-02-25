import { auth as authService } from "../../service/index.js";

export const auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService({ email, password });
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
