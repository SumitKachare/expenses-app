import mongoose from  "mongoose"

const expenseCategorySchema  = new mongoose.Schema({
    categoryName : {
        type : String,
        required : [true , "Expense category name is required"],
        trim : true
    }, 
    categoryDescription : {
        type : String,
        required : [true , "Expense category description is required"],
        trim : true
    },
    admin : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
} , {
     timestamps : true
})

const ExpenseCategory = mongoose.model("ExpenseCategory" , expenseCategorySchema)

export default ExpenseCategory