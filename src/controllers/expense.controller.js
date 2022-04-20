import { response } from "express";
import { createExpenseService, deleteExpenseService, getAllExpenseService, getExpenseByIdService, updateExpenseService } from "../services/expense.service.js";
import catchAsync from "../utils/catchAsync.js";

export const createExpense = catchAsync(async(req , res ,next)=>{

    const adminId = req.user._id

    const response = await createExpenseService(adminId , req.body)

    res.status(response.status).json(response.resData)

})

export const getExpenseById = catchAsync(async(req , res ,next)=>{

    const {expenseId} = req.params

    const adminId = req.user._id

    const response = await getExpenseByIdService(expenseId , adminId)

    res.status(response.status).json(response.resData)
    
})


export const getExpenses = catchAsync(async(req , res ,next)=>{

    const adminId = req.user._id
    const reqQuery = req.query

    const response = await getAllExpenseService(adminId , reqQuery)

    res.status(response.status).json(response.resData)
})

export const updateExpense = catchAsync(async(req , res ,next)=>{

    const {expenseId} = req.body

    const adminId = req.user._id

    const response = await updateExpenseService(expenseId ,adminId , req.body)
    
    res.status(response.status).json(response.resData)
})

export const deleteExpense = catchAsync(async(req , res ,next)=>{

    const {expenseId} = req.body

    const adminId = req.user._id

    const response = await deleteExpenseService(expenseId , adminId)

    res.status(response.status).json(response.resData)
})