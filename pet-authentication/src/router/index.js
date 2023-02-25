import { Router } from "express";
import { register, auth, logout, refresh } from "../controllers/index.js";
import { body } from "express-validator";

export const router = new Router();

router.post(
  "/register",
  body("email").notEmpty(),
  body("password").notEmpty(),
  body("fullName").notEmpty(),
  register
);
router.post("/auth", auth);
router.post("/logout", logout);
router.post("/refresh", refresh);
