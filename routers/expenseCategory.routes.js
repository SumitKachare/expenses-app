import express from "express"
import { categoryInvite, categoryInviteAccept,  createExpenseCategory, deleteExpenseCategory, getExpenseCategories, getExpenseCategoryById, updateExpenseCategory } from "../controllers/expenseCategory.controller.js"
import { createExpSchema , deleteExpSchema, expCategoryInvite, expCategoryInviteVerify, getByIdExpSchema, updateExpSchema } from "../validations/expenseCategory.validations.js"
import { validate } from "../middlewares/validation.middleware.js";
import { authVerify } from "../middlewares/auth.middeware.js";

const router = express.Router()

router.post("/" ,createExpSchema , validate , authVerify ,createExpenseCategory)

router.get("/:expenseCatId" , getByIdExpSchema , validate , authVerify , getExpenseCategoryById)

router.get("/" , authVerify , getExpenseCategories)

router.patch("/" , updateExpSchema , validate , authVerify , updateExpenseCategory)

router.delete("/" , deleteExpSchema , validate  , authVerify , deleteExpenseCategory)

// Invite category routes

router.post('/category-invite' , expCategoryInvite, validate, authVerify , categoryInvite )

router.post('/category-invite-accept' , expCategoryInviteVerify, validate, authVerify , categoryInviteAccept )

// admin can cancel invite

// admin can remove user from the exp category as invites user

// udpate role for invited user



export default router