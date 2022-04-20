import express from "express";
import Role from "../models/roles.models.js";

const router = express.Router()

router.post('/createRole' , async(req , res , next) => {

    // const {roleName} = req.body

    const response = await Role.create(req.body)

    res.send(response)


})

export default router