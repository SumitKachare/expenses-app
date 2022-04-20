import express from "express";
import { authVerify } from "../middlewares/auth.middeware.js";
const router = express.Router()

router.post('/' , authVerify  , (req , res)=>{
    res.send("hello in protected router")
})


// change password will come under user routes since its related to users and protected route
// router.route("/reset-password/:resetToken").patch(changePassword);
export default router