import User from "../models/user.model.js"
import ApiError from "../utils/errorClass.js"
import { verifyAccessJwt } from "../utils/jwtUtils.js"

export const authVerify = async (req , res , next) => {
    try {
        let token

        // check weather the token is present in request 
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

            // extract the token out of Authorization
            token = req.headers.authorization.split(" ")[1]
        }

        // console.log("token" , token);

        if (!token) {
            return next(new ApiError("Please Authenticate" , 401))
        }

        const userId = await verifyAccessJwt(token)

        const user = await User.findById(userId)

        if (!user) {
            return next(new ApiError("Please Authenticate" , 401))
        }

        req.user = user

        next()


    } catch (error) {
        next(error)
    }
}