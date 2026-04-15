import express from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { authorizeRoled } from "../../middlewares/role.middleware.js";
import {
  createBill,
  deleteBill,
  getBills,
  getSingleBill,
  updateBill,
} from "./bills.controller.js";

const router = express.Router();

router.use(isAuthenticated, authorizeRoled("admin"));
//Main Bills
router.post("/", createBill);
router.get("/", getSingleBill);
router.get("/:id", getBills);
router.patch("/:id", updateBill);
router.delete("/:id", deleteBill);

export default router;
