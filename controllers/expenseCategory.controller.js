import { createExpenseCategoryService, deleteExpenseCategoryService, getExpenseCategoriesService, getExpenseCategoryServiceById, updateExpenseCategoryService } from "../services/expenseCategory.services.js";
import catchAsync from "../utils/catchAsync.js";

export const createExpenseCategory = catchAsync(async (req , res, next)=>{

    const adminId = req.user._id

    const response = await createExpenseCategoryService(adminId  , req.body)

    res.status(201).send(response)

})

export const getExpenseCategoryById = catchAsync(async (req , res, next)=>{

    const {expenseCatId} = req.params

    const adminId = req.user._id

    const response = await getExpenseCategoryServiceById(expenseCatId , adminId)

    res.status(200).send(response)

})

export const getExpenseCategories = catchAsync(async (req , res, next)=>{
    
    const adminId = req.user._id

    const response = await getExpenseCategoriesService(adminId)

    res.status(200).send(response)

})

export const updateExpenseCategory = catchAsync(async (req , res, next)=>{

    const {expenseCategoryId} = req.body

    const adminId = req.user._id

    const response = await updateExpenseCategoryService(expenseCategoryId ,adminId, req.body)

    res.status(200).send(response)

})

export const deleteExpenseCategory = catchAsync(async (req , res, next)=>{

    const {expenseCategoryId} = req.body

    const adminId = req.user._id

    const response = await deleteExpenseCategoryService(expenseCategoryId , adminId)

    res.status(204).send(response)

})