import express from "express";
import {
  getActiveUsersPaidAnalytics,
  getAllTimePaidAnalytics,
  getOwnerPaidAnalytics,
  getPaidAnalytics,
} from "./analytics.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// GET analytics
router.use(isAuthenticated, authorizeRoles("admin"));
router.get("/paid/all-time", getAllTimePaidAnalytics);
router.get("/paid", getPaidAnalytics);
router.get("/users-paid", getActiveUsersPaidAnalytics);
router.get("/owner-paid", getOwnerPaidAnalytics);

export default router;
