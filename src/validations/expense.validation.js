import {body  , param} from "express-validator"

export const createExpenseVal = [
    body("name")
    .exists({checkFalsy : true , checkNull : true})
    .withMessage("Expense name is required"),

    body("amount")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense amount is required")
    .isInt({min : 1}).withMessage("Amount should be number with minimum value of 1"),

    body("type")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense type is required")
    .isIn(["credit" , "debit"]).withMessage("Only credit and debit expense types are expected"),

    body("categoryId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense type is required")
    .isMongoId().withMessage("Invalid Expense Id"),

   

]

export const getExpenseIDVal = [
    param("expenseId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense id is required")
    .isMongoId().withMessage("Invalid Expense Id")
]


export const updateExpenseVal = [
    body("expenseId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense id is required")
    .isMongoId().withMessage("Invalid Expense Id")
]


export const deleteExpenseVal = [
    body("expenseId")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Expense id is required")
    .isMongoId().withMessage("Invalid Expense Id")
]