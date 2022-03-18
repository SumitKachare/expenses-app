import  {validationResult} from 'express-validator'
import ApiError from '../utils/errorClass.js';


export const validate = (req , res, next) => {
    const errors =  validationResult(req)

    if(!errors.isEmpty()){
        const extractedErrors = []

        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    
        return res.status(422).json({
            error: extractedErrors,
            success : false
          })
    } 
    next()
}