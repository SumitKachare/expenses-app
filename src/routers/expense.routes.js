import express from "express";
import { createExpense , getExpenseById , getExpenses , updateExpense  , deleteExpense } from "../controllers/expense.controller.js";
import { createExpenseVal, deleteExpenseVal, getExpenseIDVal, updateExpenseVal } from "../validations/expense.validation.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authVerify } from "../middlewares/auth.middeware.js";

const router = express.Router()

router.post('/' , createExpenseVal ,validate , authVerify,createExpense)

router.get('/:expenseId' , getExpenseIDVal ,validate ,authVerify ,getExpenseById)

router.get('/' , authVerify ,getExpenses)

router.patch('/' , updateExpenseVal , validate , authVerify ,updateExpense)

router.delete('/' , deleteExpenseVal ,validate , authVerify ,deleteExpense)

export default router
