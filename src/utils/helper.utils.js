// generate common response for success and errors
export const generateRes = (success  , message , data , status = 200 ) => {

    const res = {
        resData : {
            success, 
            message, 
            data
        },
        status 
    }
    
    return res
}