import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.routes.js";
import expenseCategory from "./expenseCategory.routes.js";
import expenses from "./expense.routes.js";
import roles from "./role.routes.js";

const router = express.Router()

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/expenseCategory", expenseCategory);

router.use("/expense", expenses);

router.use("/role", roles );

export default router