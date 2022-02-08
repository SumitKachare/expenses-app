import mongoose from "mongoose"

const tokenSchema = new mongoose.Schema({
    userId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    token:{
        type : String,
        required : true
    },
    createdAt : {
        type :Date,
        expires : 3600,
        default : Date.now
    }
})

const Token = mongoose.model("Token" , tokenSchema)

export default Token