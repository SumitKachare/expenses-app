import mongoose from "mongoose"

const invitesStatusSchema = new mongoose.Schema({
    inviteEmail:{
        type : String,
        required : [true, "Invite email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
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
    isAccepted : {
        type : Boolean,
        default : false

    }
} , {
    timestamps : true
})

const InviteStatus = mongoose.model("InviteStatus" ,invitesStatusSchema)

export default InviteStatus