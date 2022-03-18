import ExpenseCategory from "../models/expenseCategory.model.js"
import InviteStatus from "../models/invites.model.js";
import Role from "../models/roles.models.js";

import ApiError from "../utils/errorClass.js"

import {generateJWTUtilToken , verifyJWTUtilToken } from "../utils/jwtUtils.js";
import { sendMail } from "../utils/email.utils.js";
import InvitesExpenseCategory from "../models/invitesExpenseCat.model.js";

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

// Invite Services

export const categoryInviteService = async (data, {_id , email}) => {



    // loop through the data arr

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        // invites details to save in db
        const obj = {...element , adminId : _id}

        // check if the user is not as same as admin
        if(data.inviteEmail === email){
            throw new ApiError("Cannot invite yourself" , 400)
        }

        // check the invite alredy exist in invites collections then [pending]
         

        // check the expense category and role exists

        const role = await Role.findById(element.roleId)

        if (!role) {
            throw new ApiError("Role not found" , 404)
        }

        // check if the category exists in db
        const expCat = await ExpenseCategory.findById(element.expCategoryId)

        if (!expCat) {
            throw new ApiError("Expense Category not found" , 404)
        }

        // save the data in db
        const invite = await InviteStatus.create(obj)

        // create JWT token
        const token = await generateJWTUtilToken(obj , "category-invite")

        // send email 

        // create link
        const link = `${process.env.CLIENT_URL}/invite-category?token=${token}`

        const message = `
                <h1>Expense Category Invite Link<h1>
                <p>Please go to this link to accept the invite</p>
                <a href=${link} clicktracking=off>${link}</a>
                `

        // email options
        const mailDetails = {
            to : element.inviteEmail,
            subject : "Expense Invite Request",
            text : message
        }

        // send mail
        const emailRes = await sendMail(mailDetails)
        
    }

    const res = {
        success : true,
        message : "Expense Invite link sent successfully",
        data : null
      }
    
    return res

}

export const expCategoryInviteAcceptService = async(inviteToken , admin) => {

    // decode jwt

    const {inviteEmail , expCategoryId , roleId ,adminId } = await verifyJWTUtilToken(inviteToken , "category-invite")

    console.log("decodedInvite" , inviteEmail , expCategoryId , roleId ,adminId );
    console.log("admin" , admin);

    // check the inviteEmail is same as adminEmail
    // this check makes sure that the invited user is using this token

    if(inviteEmail !== admin.email ) {
        throw new ApiError("Access Denied" , 401)
    }

    // then check that in invites db there is a document which has the inviteEmail ,expCategoryId , adminId as same as data in decoded jwt and isAccepted as false

    const inviteObj = {
        inviteEmail ,
        expCategoryId ,
        roleId ,
        adminId,
        isAccepted : false
    }

    const inviteDetail = await InviteStatus.findOne(inviteObj)

    if(!inviteDetail){
        throw new ApiError("Invite not found" , 404)
    }

    // check weather the role and exp category exist in db
    const role = await Role.findById(roleId)

    if(!role){
        throw new ApiError("Role not found" , 404)
    }

    const expCategory = await ExpenseCategory.findById(expCategoryId)

    if(!expCategory){
        throw new ApiError("Expense Category not found" , 404)
    }

    // save the invite with isAccepted flag to true in db

    inviteDetail.isAccepted = true
    await inviteDetail.save()


    // if found then save a new document in ExpenseCategory Invite Schema
    // this will handle to get all document for invited user 

    const expInvite = {
        userEmail : inviteEmail,
        userId : admin._id, 
        expCategoryId , 
        roleId , 
        adminId
    }

    const expenseInviteRes = await InvitesExpenseCategory.create(expInvite)

    const res = {
        success : true,
        message : "Invite Accepted Successfully",
        data : expenseInviteRes
      }
    
    return res

}