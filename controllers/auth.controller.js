import { forgetPasswordService, loginService, logoutService, refreshTokenService, registerService, resetPasswordService } from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/errorClass.js";

export const register = catchAsync(async (req, res, next) => {

  let response = await registerService(req.body);

  res.status(200).send(response);
  
});


export const login = catchAsync(async (req, res, next) => {

  let response = await loginService(req.body);

  res.status(200).send(response);
  
});


export const forgetPassword = catchAsync(async (req , res, next)=>{

  const {email} = req.body

  let respose = await forgetPasswordService(email)

  res.status(200).send(respose)
})

export const resetPassword = catchAsync(async (req , res , next)=>{

  const {password , resetToken} = req.body

  const response = await resetPasswordService(resetToken , password)

  res.status(200).send(response)

})

export const refreshToken = catchAsync(async (req , res, next)=>{

  const  {refreshToken} = req.body

  const response = await refreshTokenService(refreshToken)

  res.status(200).send(response)
})

export const logout = catchAsync(async (req , res, next)=>{

  const  {refreshToken} = req.body

  const response = await logoutService(refreshToken)

  res.status(204).send()
})