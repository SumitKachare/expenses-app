import ExpenseCategory from "../models/expenseCategory.model.js"
import ApiError from "../utils/errorClass.js"

export const createExpenseCategoryService = async (reqBody) => {
    
    const expenseCategory = await ExpenseCategory.create(reqBody)

    if (!expenseCategory) {
        throw new ApiError("Failed to create Expense category")
    }   

    const res = {
        success : true,
        message : "Expense category created successfully ",
        data : expenseCategory
    }

    return res
}

export const getExpenseCategoryServiceById = async (expCategoryId) => {
    
    const expenseCategory = await ExpenseCategory.findById(expCategoryId)

    if (!expenseCategory) {
        throw new ApiError("Expense category not found")
    }   

    const res = {
        success : true,
        message : "Expense category fetched",
        data : expenseCategory
    }

    return res
}


export const getExpenseCategoriesService = async () => {
    
    const expenseCategories = await ExpenseCategory.find()

    if (!expenseCategories) {
        throw new ApiError("Expense category not found")
    }   

    const res = {
        success : true,
        message : "Expense categories fetched",
        data : expenseCategories
    }

    return res
}


export const updateExpenseCategoryService = async (expCategoryId , reqBody) => {

    // check weather the expense id exists

    const isExpense = await ExpenseCategory.findById(expCategoryId)

    if(!isExpense){
        throw new ApiError("Expense category not found" , 404)
    }
    
    const expenseCategory = await ExpenseCategory.findByIdAndUpdate(expCategoryId , reqBody , {
        new : true,
        runValidators : true
    })

    if (!expenseCategory) {
        throw new ApiError("Expense category not updated")
    }   

    const res = {
        success : true,
        message : "Expense category updated",
        data : expenseCategory
    }

    return res
}


export const deleteExpenseCategoryService = async (expCategoryId ) => {

     // check weather the expense id exists

     const isExpense = await ExpenseCategory.findById(expCategoryId)

     if(!isExpense){
         throw new ApiError("Expense category not found" , 404)
     }
    
    const expenseCategory = await ExpenseCategory.findByIdAndDelete(expCategoryId)

    if (!expenseCategory) {
        throw new ApiError("Failed to deleted Expense category")
    }   

    const res = {
        success : true,
        message : "Expense category deleted",
        data : null
    }

    return res
}