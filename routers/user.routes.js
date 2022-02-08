import express from "express";
import { authVerify } from "../middlewares/auth.middeware.js";
const router = express.Router()

router.post('/' , authVerify  , (req , res)=>{
    res.send("hello in protected router")
})

export default router