import jwt from "jsonwebtoken"
import ApiError from "./errorClass.js"


export const generateAccessToken = async (userId) => {

    // load access secret from env
    const accessSecret = process.env.JWT_ACCESS_SECRET

    if (!accessSecret) {
        throw new ApiError("Token generation error" , 500)
    }

    // promisify access token
    return new Promise((resolve , reject)=>{

        // sign access token
        jwt.sign({id : userId} ,accessSecret , {
            expiresIn : '1h'
        } , function ( err , token) {

            // callback
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    })
    
} 



export const generateRefreshToken = async (userId) => {

    // load access secret from env
    const refreshSecret = process.env.JWT_REFRESH_SECRET

    if (!refreshSecret) {
        throw new ApiError("Token generation error" , 500)
    }

    // promisify access token
    return new Promise((resolve , reject)=>{

        // sign access token
        jwt.sign({id : userId} ,refreshSecret , {
            expiresIn : '30d'
        } , function ( err , token) {

            // callback
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    })
    
} 

export const verifyAccessJwt = (token) => {

    const accessSecret = process.env.JWT_ACCESS_SECRET

    console.log("accessSecret" . accessSecret);

    return new Promise((resolve , reject)=>{
        jwt.verify(token  , accessSecret , (err , data)=>{
            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
} 