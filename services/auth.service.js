import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import ApiError from "../utils/errorClass.js";
import {  generateAccessToken, generateJWTUtilToken, generateRefreshToken, verifyJWTUtilToken, verifyRefreshJwt } from "../utils/jwtUtils.js";
import crypto from "crypto"
import { sendMail } from "../utils/email.utils.js";
import client from "../config/redis.config.js";
import { diff_hours } from "../utils/helper.utils.js";
import moment from "moment";


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

  user.isForgetPassword = true

  await user.save()

  // generate jwt token with user id as payload which is valid for 1 hour
  const token = await generateJWTUtilToken(user._id , "forget-password")

  // create link
  const link = `${process.env.CLIENT_URL}/password-reset?token=${token}`

  console.log("link" , link);
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
  const emailRes = await sendMail(mailDetails)
  
  const res = {
    success : true,
    message : "Password reset link sent successfully",
    data : null
  }

  return res

}

export const resetPasswordService = async (resetToken , password) => {

  // verify the token
  const {data} = await verifyJWTUtilToken(resetToken , "forget-password")

  // fing the user
  const user = await User.findById(data)

  // find that user exists
  if (!user) {
    throw new ApiError("Password reset error" , 404)
  }

  // change the passowrd of the user to the recieving password
  user.password =  password
  user.isForgetPassword = false

  // do user.save()
  user.save()

  // delete the above token from token db
  // const deleteToken = await Token.findByIdAndDelete(tokenData._id)

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