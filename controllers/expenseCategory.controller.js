import { createExpenseCategoryService, deleteExpenseCategoryService, getExpenseCategoriesService, getExpenseCategoryServiceById, updateExpenseCategoryService } from "../services/expenseCategory.services.js";
import catchAsync from "../utils/catchAsync.js";

export const createExpenseCategory = catchAsync(async (req , res, next)=>{

    const response = await createExpenseCategoryService(req.body)

    res.status(201).send(response)

})

export const getExpenseCategoryById = catchAsync(async (req , res, next)=>{

    const {expenseCatId} = req.params

    const response = await getExpenseCategoryServiceById(expenseCatId)

    res.status(200).send(response)

})

export const getExpenseCategories = catchAsync(async (req , res, next)=>{


    const response = await getExpenseCategoriesService()

    res.status(200).send(response)

})

export const updateExpenseCategory = catchAsync(async (req , res, next)=>{

    const {expenseCategoryId} = req.body

    const response = await updateExpenseCategoryService(expenseCategoryId , req.body)

    res.status(200).send(response)

})

export const deleteExpenseCategory = catchAsync(async (req , res, next)=>{

    const {expenseCategoryId} = req.body

    const response = await deleteExpenseCategoryService(expenseCategoryId)

    res.status(204).send(response)

})