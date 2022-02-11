import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.routes.js";
import expenseCategory from "./expenseCategory.routes.js";

const router = express.Router()

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/expenseCategory", expenseCategory);

export default router