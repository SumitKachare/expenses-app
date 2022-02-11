import {body , param} from "express-validator"


export const createExpSchema = [
    body("categoryName")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense category name is required"),

    body("categoryDescription")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense description name is required"),

    body("admin")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense admin is required")
    .isMongoId().withMessage("Invalid Admin")

]


export const getByIdExpSchema = [

    param("expenseCatId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense admin is required")
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

