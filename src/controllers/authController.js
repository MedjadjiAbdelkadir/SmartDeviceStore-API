const { statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { register, login, forgotPassword, verifyResetCode,resetPassword} = require('../services/authService')

/*
    @desc    Register User
    @route   POST /api/auth/register
    @access  Public
*/
exports.register =async (req, res , next)=>{
    try {
        const user= await register(req.body)
        return sendSuccessResponse(res , 'User Register successfully' , user , statusCodes.CREATED) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Login User
    @route   POST /api/auth/login
    @access  Public
*/
exports.login =async (req, res , next)=>{
    try {
        const user= await login(req.body)
        if(user){
            return sendSuccessResponse(res , 'User Login successfully' , user , statusCodes.OK) 
        }
        return sendErrorResponse(res , 'Email Or Password Incorrect', statusCodes.UNAUTHORIZED)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}


/*
    @desc    Forgot Password
    @route   POST /api/v1/auth/forgotPassword
    @access  Public
*/
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await forgotPassword(req.body.email)
        return sendSuccessResponse(res , 'Send Reset Code successfully' , null , statusCodes.OK) 
        // if(user){
        //     return sendSuccessResponse(res , 'Send Reset Code successfully' , null , statusCodes.OK) 
        // }
        // return sendErrorResponse(res , 'Error Send Reset Code ', statusCodes.UNAUTHORIZED)
    } catch (error) {
        return sendErrorResponse(res , error.message,error.status || statusCodes.INTERNAL_SERVER_ERROR)

        //  return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)

    }
}

/*
    @desc    verify Reset Code
    @route   POST /api/v1/auth/verifyResetCode
    @access  Public
*/
exports.verifyResetCode = async (req, res, next) =>{
    try {
        const {resetCode} = req.body
        const verify = await verifyResetCode(resetCode)
        return sendSuccessResponse(res , 'Success' , null , statusCodes.OK) 
    } catch (error) {
        return sendErrorResponse(res , error.message,error.status || statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Reset Password
    @route   POST /api/v1/auth/resetPassword
    @access  Public
*/

exports.resetPassword = async (req, res, next) =>{
    try {
        const {email,password} = req.body
        const token = await resetPassword(email,password)
        return sendSuccessResponse(res , 'Success Update Password' , token , statusCodes.OK) 
    } catch (error) {
        return sendErrorResponse(res , error.message,error.status || statusCodes.INTERNAL_SERVER_ERROR)
        
    }
}