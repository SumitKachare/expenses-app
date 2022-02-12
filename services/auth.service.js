import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import ApiError from "../utils/errorClass.js";
import {  generateAccessToken, generateRefreshToken, verifyRefreshJwt } from "../utils/jwtUtils.js";
import crypto from "crypto"
import bcrypt from "bcrypt"
import { sendResetMail } from "../utils/email.utils.js";
import client from "../config/redis.config.js";


export const registerService = async (reqBody) => {
  const { username, password, email } = reqBody;

  // check wether the user already exists
  const isUser = await User.findOne({ email });

  if (isUser) {
    throw new ApiError("User already exists", 409);
  }

  // save new user
  const user = await User.create(reqBody);

  if (!user) {
    throw new ApiError("Failed to register", 500);
  }

  // create refresh and access token

  const accessToken = await generateAccessToken(user._id)
  const refreshToken = await generateRefreshToken(user._id)


  const data = {
    user :user, 
    tokens : {
      accessToken ,
      refreshToken
    }
  }

  const res = {
    success : true,
    message : "Successful Registration",
    data 
  }

  return res;
};


export const loginService = async (reqBody) => {
  const {email , password} = reqBody

  if (!email || !password) {
      throw new ApiError('Please provide username and password' , 400)
  }

  // check weather the user exists
  const user = await User.findOne({email : email}).select('+password')

  if (!user) {
    throw new ApiError("Invalid Username or Password" , 401)
  }

  const isCorrect = await user.comparePassword(password)

  if (!isCorrect) {
    throw new ApiError("Invalid Username or Password" , 401)
  }

  // create refresh and access token

  const accessToken = await generateAccessToken(user._id)
  const refreshToken = await generateRefreshToken(user._id)

  const data = {
    user :user, 
    tokens : {
      accessToken ,
      refreshToken
    }
  }
  
  const res = {
    success : true,
    message : "Successful Registration",
    data 
  }

  return res

}

export const forgetPasswordService = async (email) => {
  // check weather the email is provided

  if (!email) {
    throw new ApiError("Please provide Email" , 400)
  }

  // find weather the user exists
  const user = await User.findOne({email : email})

  if (!user) {
    throw new ApiError("Email authentication Error" , 400)
  } 

  // find weather the token exists with the user Id
  const token = await Token.findOne({userId :user._id})

  // delete the token if prevoius exist
  if (token) {
    const deleteToken = await Token.findByIdAndDelete(token._id)
  }

  // generate reset token
  const resetTokenString = crypto.randomBytes(32).toString("hex")

  // hash the reset token
  const resetPasswordHash = crypto
    .createHash("sha256")
    .update(resetTokenString)
    .digest("hex");

  
  const tokenData = {
    userId : user._id,
    token : resetPasswordHash,
    createdAt : Date.now()
  }

  // save token in db
  const tokenCreated = await Token.create(tokenData)

  // create link
  const link = `${process.env.CLIENT_URL}/password-reset?token=${resetTokenString}&id=${user._id}`

  const message = `
        <h1>Reset password URL<h1>
        <p>Please go to this link to reset your password</p>
        <a href=${link} clicktracking=off>${link}</a>
        `

        // email options
  const mailDetails = {
    to : user.email,
    subject : "Password reset Request",
    text : message
  }
  
  // send email
  const emailRes = await sendResetMail(mailDetails)
  
  const res = {
    success : true,
    message : "Password reset link sent successfully",
    data : null
  }

  return res

}

export const resetPasswordService = async (resetToken , password) => {

  // hash the token
  const resetPasswordHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // find the token with the resetToken in Token DB
  const tokenData = await Token.findOne({token : resetPasswordHash})

  if (!tokenData) {
      throw new ApiError("Password reset error" , 500)
  }

  // get the user out from the token

  const user = await User.findById(tokenData.userId)

  if (!user) {
    throw new ApiError("Password reset error" , 500)
  }

  // change the passowrd of the user to the recieving password

  user.password =  password

  // do user.save()

  user.save()

  // delete the above token from token db

  const deleteToken = await Token.findByIdAndDelete(tokenData._id)

  const res = {
    success : true,
    message : "Password changed successfully",
    data : null
  }

  return res

}

export const refreshTokenService = async (reqRefreshToken) => {

  const userId = await verifyRefreshJwt(reqRefreshToken)

  const user = await User.findById(userId)

  if (!user) {
      return next(new ApiError("Please Authenticate" , 401))
  }

  const accessToken = await generateAccessToken(user._id)
  const refreshToken = await generateRefreshToken(user._id)

  const res = {
    accessToken ,
    refreshToken
  }

  return res

}

export const logoutService = async (refreshToken) => {

  // verify the refresh token

  const userId = await verifyRefreshJwt(refreshToken)

  //delete the token from redis

  client.del(userId).then((data)=>{
    console.log(data);
    return
  })  
  .catch((err)=>{
    throw new ApiError()
  })

  // send 204  in response

}