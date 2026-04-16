import express from "express";
import { isAuthenticated } from "../../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../../middlewares/role.middleware.js";
import { getActiveUsersPaidAnalytics } from "./users.controller.js";

const router = express.Router();

// GET analytics
router.use(isAuthenticated, authorizeRoles("admin"));
router.get("/users-paid", getActiveUsersPaidAnalytics);

export default router;
