import mongoose from "mongoose"

const expenseSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please provide Expense title"],
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    amount:{
        type : Number,
        required : [true , "Please provide Expense Amount"],
        min: [1, 'Amount cannot be zero or less than zero'],
    },
    type : {
        type : String,
        required : [true , "Expense type is required"],
        enum : {
            values : ["credit" , "debit"],
            message : '{VALUE} is not supported'
        }
    },
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "ExpenseCategory",
        required : [true , "Expense category is required"],
    },
    admin: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "Expense admin is required"],
    }
},{
    timestamps : true
})


const ExpensesModel = mongoose.model("Expense" , expenseSchema)

export default ExpensesModel