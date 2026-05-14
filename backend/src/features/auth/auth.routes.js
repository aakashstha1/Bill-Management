import express from "express";
import { getMe, login, logout, refreshToken } from "./auth.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMe);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", isAuthenticated, logout);

export default router;
