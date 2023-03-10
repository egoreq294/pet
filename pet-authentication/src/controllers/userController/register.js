import { validationResult } from "express-validator";
import { ApiError } from "../../exceptions/index.js";
import { register as registerService } from "../../service/index.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest("Введены не все обязательные поля", errors.array())
      );
    }

    const { email, password, fullName } = req.body;
    const userData = await registerService({
      email,
      password,
      fullName,
    });
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
