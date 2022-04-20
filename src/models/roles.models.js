import mongoose from "mongoose"

const rolesSchema = new mongoose.Schema({
    roleName : {
        type : String
    }
})

const Role = mongoose.model("Role" , rolesSchema)

export default Role