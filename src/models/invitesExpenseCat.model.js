import mongoose from "mongoose"

const invitesExpenseCategorySchema = new mongoose.Schema({
    userEmail :{
        type : String,
        required : [true, "Invite user email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
    },
    userId: {
        type :  mongoose.Schema.Types.ObjectId,
        required : [true, "Invited User Id required"],
        ref : "User"
    },
    expCategoryId : {
        type :  mongoose.Schema.Types.ObjectId,
        required : [true, "Expense Category Id is required"],
        ref : "ExpenseCategory"
    },
    roleId : {
        type :  mongoose.Schema.Types.ObjectId,
        required : [true, "Role is Id required"],
        ref : "Role"
    },
    adminId: {
        type :  mongoose.Schema.Types.ObjectId,
        required : [true, "User Id required"],
        ref : "User"
    },
} , {
    timestamps : true
})

const InvitesExpenseCategory = mongoose.model("InvitesExpenseCategory" ,invitesExpenseCategorySchema)

export default InvitesExpenseCategory