import { categoryInviteService, createExpenseCategoryService, deleteExpenseCategoryService, expCategoryInviteAcceptService, getExpenseCategoriesService, getExpenseCategoryServiceById, updateExpenseCategoryService } from "../services/expenseCategory.services.js";
import catchAsync from "../utils/catchAsync.js";

export const createExpenseCategory = catchAsync(async (req , res, next)=>{

    const adminId = req.user._id

    const response = await createExpenseCategoryService(adminId  , req.body)

    res.status(response.status).json(response.resData)

})

export const getExpenseCategoryById = catchAsync(async (req , res, next)=>{

    const {expenseCatId} = req.params

    const adminId = req.user._id

    const response = await getExpenseCategoryServiceById(expenseCatId , adminId)

    res.status(response.status).json(response.resData)

})

export const getExpenseCategories = catchAsync(async (req , res, next)=>{
    
    const adminId = req.user._id

    const response = await getExpenseCategoriesService(adminId)

    res.status(response.status).json(response.resData)

})

export const updateExpenseCategory = catchAsync(async (req , res, next)=>{

    const {expenseCategoryId} = req.body

    const adminId = req.user._id

    const response = await updateExpenseCategoryService(expenseCategoryId ,adminId, req.body)

    res.status(response.status).json(response.resData)

})

export const deleteExpenseCategory = catchAsync(async (req , res, next)=>{

    const {expenseCategoryId} = req.body

    const adminId = req.user._id

    const response = await deleteExpenseCategoryService(expenseCategoryId , adminId)

    res.status(response.status).json(response.resData)

})


// Invite controllers

export const categoryInvite = catchAsync(async (req , res, next)=>{

    const {data} = req.body

    const adminId = req.user

    const response = await categoryInviteService(data , adminId)

    res.status(response.status).json(response.resData)


})


export const categoryInviteAccept = catchAsync(async (req , res, next)=>{

    const {expenseInviteToken} = req.body

    const admin = req.user

    const response = await expCategoryInviteAcceptService(expenseInviteToken , admin)

    res.status(response.status).json(response.resData)

})