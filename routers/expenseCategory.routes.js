import express from "express"
import { createExpenseCategory, deleteExpenseCategory, getExpenseCategories, getExpenseCategoryById, updateExpenseCategory } from "../controllers/expenseCategory.controller.js"
import { createExpSchema , deleteExpSchema, getByIdExpSchema, updateExpSchema } from "../validations/expenseCategory.validations.js"
import { validate } from "../middlewares/validation middleware.js";
import { authVerify } from "../middlewares/auth.middeware.js";

const router = express.Router()

router.post("/" ,createExpSchema , validate , authVerify ,createExpenseCategory)

router.get("/:expenseCatId" , getByIdExpSchema , validate , authVerify , getExpenseCategoryById)

router.get("/" , authVerify , getExpenseCategories)

router.patch("/" , updateExpSchema , validate , authVerify , updateExpenseCategory)

router.delete("/" , deleteExpSchema , validate  , authVerify , deleteExpenseCategory)

export default router