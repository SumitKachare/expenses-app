import ExpensesModel from "../models/expense.model.js"
import ExpenseCategory from "../models/expenseCategory.model.js"
import {AdvancedResults, getPaginateData} from "../utils/advanvedResults.js"
import ApiError from "../utils/errorClass.js"
import { generateRes } from "../utils/helper.utils.js"

export const createExpenseService = async (adminId , reqBody) =>{

    reqBody.admin = adminId

    const expCategory = await ExpenseCategory.findById(reqBody.categoryId)

    if (!expCategory) {
        throw new ApiError("Expense Category not found")
    }

    const expense = await ExpensesModel.create(reqBody)

    if (!expense) {
        throw new ApiError("Failed to create Expense")
    }

    const res = generateRes(true , "Expense created successfully" , expense , 201)

    return res;
}

export const getExpenseByIdService = async (expenseId , adminId) =>{

    const expense = await ExpensesModel.findOne({_id : expenseId  , admin : adminId})

    if (!expense) {
        throw new ApiError("Expense not found")
    }

    const res = generateRes(true , "Expense found successfully" , expense , 200)

    return res;
}

export const getAllExpenseService = async (adminId , reqQuery) =>{


    let expenses    

    const advancedQuery = new AdvancedResults(ExpensesModel.find({admin : adminId}) , reqQuery , 10).search().filter().sort()

    expenses = await advancedQuery.query

    advancedQuery.pagination()

    const pagination = getPaginateData(expenses.length  , advancedQuery.defaultResultCount , reqQuery.page )

    expenses = await advancedQuery.query.clone();

    const data = {
        pagination,
        count : expenses.length,
        expenses
    }

    const res = generateRes(true , "All expenses fetched successfully" , data , 200)

    return res;
}

export const updateExpenseService = async (expenseId ,adminId ,reqBody) => {


    if (reqBody.categoryId) {
        const expCategory = await ExpenseCategory.findById(reqBody.categoryId)

        if (!expCategory) {
            throw new ApiError("Expense Category not found")
        }
    }

    const isExpense = await ExpensesModel.findOne({_id : expenseId , admin : adminId})

    if (!isExpense) {
        throw new ApiError("Expense not found")
    }

    const updatedExpense = await ExpensesModel.findByIdAndUpdate(expenseId , reqBody , {
        new : true ,
        runValidators : true
    })

    if (!updatedExpense) {
        throw new ApiError("Failed to update expense")
    }

    const res = generateRes(true , "Expense updated successfully" , updatedExpense , 200)

    return res;
}

export const deleteExpenseService = async (expenseId , adminId) => {

    const isExpense = await ExpensesModel.findById({_id : expenseId , admin : adminId })

    if (!isExpense) {
        throw new ApiError("Expense not found")
    }

    const expense = await ExpensesModel.findByIdAndDelete(expenseId)

    if (!expense) {
        throw new ApiError("Failed to delete expense")
    }

    const res = generateRes(true , "Expense deleted successfully" , null , 200)

    return res;
}