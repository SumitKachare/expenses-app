import ExpenseCategory from "../models/expenseCategory.model.js"
import ApiError from "../utils/errorClass.js"

export const createExpenseCategoryService = async (adminId , reqBody) => {
    
   reqBody.admin = adminId

   console.log(reqBody);
 
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

export const getExpenseCategoryServiceById = async (expCategoryId , adminId) => {
    
    const expenseCategory = await ExpenseCategory.findOne({_id : expCategoryId , admin : adminId})

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


export const getExpenseCategoriesService = async (adminId) => {
    
    const expenseCategories = await ExpenseCategory.find({admin : adminId})

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


export const updateExpenseCategoryService = async (expCategoryId , adminId ,reqBody) => {

    // check weather the expense id exists

    const isExpense = await ExpenseCategory.findOne({_id : expCategoryId , admin : adminId})

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


export const deleteExpenseCategoryService = async (expCategoryId  , adminId) => {

     // check weather the expense id exists

     const isExpense = await ExpenseCategory.findOne({_id : expCategoryId , admin : adminId})

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