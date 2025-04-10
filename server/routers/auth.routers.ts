import express from "express";
import {
  check,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { checkPrimaryExpire, ProtectRoute } from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", ProtectRoute, checkPrimaryExpire, logout);
router.get("/check", ProtectRoute, checkPrimaryExpire, check);

export default router;
