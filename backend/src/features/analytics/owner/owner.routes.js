import express from "express";
import {
  getAllTimePaidAnalytics,
  getAllusersAndOwnerPaidAnalytics,
  getOwnerPaidAnalytics,
  getPaidAnalytics,
  getTwoYearTotalBillCompare,
} from "./owner.controller.js";
import { isAuthenticated } from "../../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../../middlewares/role.middleware.js";

const router = express.Router();

// GET analytics
router.use(isAuthenticated, authorizeRoles("admin"));
router.get("/paid/all-time", getAllTimePaidAnalytics);
router.get("/paid", getPaidAnalytics);
router.get("/owner-paid", getOwnerPaidAnalytics);
router.get("/compare", getTwoYearTotalBillCompare);
router.get("/both", getAllusersAndOwnerPaidAnalytics);

export default router;
