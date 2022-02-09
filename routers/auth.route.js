import express from "express";
import { register , login, forgetPassword, resetPassword, refreshToken, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forget-password").post(forgetPassword);

router.route("/reset-password/:resetToken").patch(resetPassword);

router.route("/refresh-token").post(refreshToken);

router.route("/logout").post(logout);

export default router;
