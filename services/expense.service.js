import ExpensesModel from "../models/expense.model.js"
import ExpenseCategory from "../models/expenseCategory.model.js"
import ApiError from "../utils/errorClass.js"

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

    const res = {
        success : true,
        message : "Expense created successfully ",
        data : expense
    }

    return res
}

export const getExpenseByIdService = async (expenseId , adminId) =>{

    const expense = await ExpensesModel.findOne({_id : expenseId  , admin : adminId})

    if (!expense) {
        throw new ApiError("Expense not found")
    }

    const res = {
        success : true,
        message : "Expense found successfully ",
        data : expense
    }

    return res
}

export const getAllExpenseService = async (adminId) =>{

    const expenses = await ExpensesModel.find({admin : adminId})

    const res = {
        success : true,
        message : "Expenses found successfully ",
        data : expenses
    }

    return res
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

    const res = {
        success : true,
        message : "Expense updated successfully ",
        data : updatedExpense
    }

    return res
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

    const res = {
        success : true,
        message : "Expense deleted successfully "
    }

    return res
}