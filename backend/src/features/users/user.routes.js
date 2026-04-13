import express from "express";
import {
  createUser,
  getUsers,
  toogleStatus,
  updateUser,
} from "./user.controller.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = express.Router();
router.use(isAuthenticated, authorizeRoles("admin"));
router.get("/", getUsers);
router.post("/create", createUser);
router.patch("/:id/update", updateUser);
router.patch("/:id/status", toogleStatus);

export default router;
