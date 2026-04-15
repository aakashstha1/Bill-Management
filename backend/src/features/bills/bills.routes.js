import express from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import {
  createBill,
  deleteBill,
  getBills,
  getSingleBill,
  updateBill,
} from "./bills.controller.js";

const router = express.Router();

router.use(isAuthenticated, authorizeRoles("admin"));
//Main Bills
router.post("/", createBill);
router.get("/", getBills);
router.get("/:id", getSingleBill);
router.patch("/:id", updateBill);
router.delete("/:id", deleteBill);

export default router;
