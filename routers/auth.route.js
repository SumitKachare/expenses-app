import express from "express";
import { register , login, forgetPassword, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forget-password").post(forgetPassword);

router.route("/reset-password/:resetToken").patch(resetPassword);

export default router;
