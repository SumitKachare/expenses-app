import { body } from  "express-validator"

export const registerSchema = [
    body('email')
    .isEmail().withMessage("Provide valid email")
    .normalizeEmail()
    .exists({checkFalsy : true , checkNull : true}).withMessage("Email is required"),

    body('username')
    .isLength({min : 3}).withMessage("Username should contain minimum 3 letters")
    .exists({checkFalsy : true , checkNull : true}).withMessage("Username is required"),

    body('password')
    .exists({checkFalsy : true , checkNull : true}).withMessage("Password is required")
    .isLength({min : 6}).withMessage("Password should contain minimum 6 letters"),
    
]

export const loginSchema = [
    body('email')
    .isEmail().withMessage("Provide valid email")
    .normalizeEmail()
    .exists({checkFalsy : true , checkNull : true}).withMessage("Email is required"),

    body('password')
    .exists({checkFalsy : true , checkNull : true}).withMessage("Password is required")
 
    
]


export const forgetPassSchema = [
    body('email')
    .isEmail().withMessage("Provide valid email")
    .normalizeEmail()
    .exists({checkFalsy : true , checkNull : true}).withMessage("Email is required"),    
]

export const resetPassSchema = [
    body('resetToken')
    .exists({checkFalsy : true , checkNull : true}).withMessage("Reset token is required"),    

    body('password')
    .exists().withMessage("Password is required")
    .isLength({min : 6}).withMessage("Password should contain minimum 6 letters"),
]


export const refreshSchema = [
    body('refreshToken')
    .exists({checkFalsy : true , checkNull : true}).withMessage("RefreshToken is required"),  
    
]

export const logoutSchema = [
    body('refreshToken')
    .exists({checkFalsy : true , checkNull : true}).withMessage("RefreshToken is required"),
]

