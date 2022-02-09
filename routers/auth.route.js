import express from "express";
import { register , login, forgetPassword, resetPassword, refreshToken, logout } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation middleware.js";
import { registerSchema , loginSchema, forgetPassSchema, resetPassSchema, refreshSchema, logoutSchema } from "../validations/auth.validations.js";


const router = express.Router();

router.route("/register").post(registerSchema ,validate,  register);

router.route("/login").post(loginSchema , validate , login);

router.route("/forget-password").post( forgetPassSchema, validate ,forgetPassword);

router.route("/reset-password").patch( resetPassSchema , validate, resetPassword);

router.route("/refresh-token").post( refreshSchema, validate, refreshToken);

router.route("/logout").post( logoutSchema, validate ,logout);

export default router;

