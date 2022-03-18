import {body , param} from "express-validator"


export const createExpSchema = [
    body("categoryName")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense category name is required"),

    body("categoryDescription")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense description name is required"),

]


export const getByIdExpSchema = [

    param("expenseCatId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense category ID is required")
    .isMongoId().withMessage("Invalid Expense category")

]


export const updateExpSchema = [

    body("expenseCategoryId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense category ID is required")
    .isMongoId().withMessage("Invalid Expense Category")

]

export const deleteExpSchema = [

    body("expenseCategoryId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense category ID is required")
    .isMongoId().withMessage("Invalid Expense Category")

]

// Category Invite Schema

export const expCategoryInvite = [

    body("data")
    .isArray().withMessage("Data provided in invalid format")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Data is required")
    .notEmpty().withMessage("Data cannot be empty"),

    body('data.*.inviteEmail')
    .isEmail().withMessage("Provide valid email")
    .normalizeEmail()
    .exists({checkFalsy : true , checkNull : true}).withMessage("Email is required"),

    body("data.*.expCategoryId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense category ID is required")
    .isMongoId().withMessage("Invalid Expense Category"),

    body("data.*.roleId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Role Id is required")
    .isMongoId().withMessage("Invalid role")


]

export const expCategoryInviteVerify = [

    body("expenseInviteToken")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense Category Invite token is required"),

]