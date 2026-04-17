import express from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import {
  createUserBill,
  deleteUserBill,
  getUserBillsById,
  getUserBillsByStatus,
  getUsersBill,
  getUserSingleBillById,
  toggleBillStatus,
  updateUserBill,
} from "./userBills.controller.js";

const router = express.Router();
router.use(isAuthenticated, authorizeRoles("admin"));
// Create user bill
router.post("/", createUserBill);

// Get all user bills
router.get("/", getUsersBill);

router.get("/status", getUserBillsByStatus);
// Get user all bills
router.get("/user/:id", getUserBillsById);

// Get single bill
router.get("/:id", getUserSingleBillById);

// Update bill
router.patch("/:id", updateUserBill);

// Toggle status
router.patch("/:id/status", toggleBillStatus);

// Delete bill
router.delete("/:id", deleteUserBill);

export default router;
