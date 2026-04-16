import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/auth.routes.js";
import userRoutes from "./features/users/user.routes.js";
import billRoutes from "./features/bills/bills.routes.js";
import userBillsRoutes from "./features/user_bills/userBills.routes.js";
import ownerAnalyticsRoutes from "./features/analytics/owner/owner.routes.js";
import userAnalyticsRoutes from "./features/analytics/user/users.routes.js";

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Backend API is Available!"));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/user-bills", userBillsRoutes);
app.use("/api/analytics/owner", ownerAnalyticsRoutes);
app.use("/api/analytics/user", userAnalyticsRoutes);

export default app;
