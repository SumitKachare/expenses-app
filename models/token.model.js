import mongoose from "mongoose"

const emailExpiry = process.env.EMAIL_INVITE_TTL

const tokenSchema = new mongoose.Schema({
    userId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    token:{
        type : String,
        required : true
    },
    // did not work
    createdAt : {
        type :Date,
        index : {expires : 40},
        default : Date.now
    }
})


// did not work
// tokenSchema.index({createdAt : 1} , {expireAfterSeconds : 60})

const Token = mongoose.model("Token" , tokenSchema)

export default Token