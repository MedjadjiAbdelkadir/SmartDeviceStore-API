const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")
const asyncHandler = require("../utils/errorHandler")

const authService = require("../services/authService")

/*
    @desc    Register User
    @route   POST baseURL/api/v1/auth/register
    @access  Public
*/
exports.register = asyncHandler( async (req, res, next) =>{
    const {user, token}= await authService.register(req.body)   
    return sendResponse(res, 'Register successfully', {user, token} , StatusCodes.CREATED)
})

/*
    @desc    Login User
    @route   POST baseURL/api/v1/auth/login
    @access  Public
*/
exports.login = asyncHandler( async (req, res, next) =>{
    const {email ,password} = req.body
    const {user , token} = await authService.login(email ,password)  
    return sendResponse(res, 'Login successfully', {user , token} , StatusCodes.OK)
})


/*
    @desc    Forgot Password
    @route   POST baseURL/api/v1/auth/forgotPassword
    @access  Public
*/
exports.forgotPassword = asyncHandler( async (req, res, next) =>{
    await authService.forgotPassword(req.body.email)
    return sendResponse(res, 'Send Reset Code successfully', null , StatusCodes.OK)
})

/*
    @desc    Verify Reset Code
    @route   POST baseURL/api/v1/auth/verifyResetCode
    @access  Public
*/
exports.verifyResetCode = asyncHandler( async (req, res, next) =>{
    const {resetCode} = req.body
    await authService.verifyResetCode(resetCode)
    return sendResponse(res, 'Verify Reset Code successfully', null , StatusCodes.OK)
})

/*
    @desc    Reset Password
    @route   POST baseURL/api/v1/auth/resetPassword
    @access  Public
*/
exports.resetPassword = asyncHandler( async (req, res, next) =>{
    const {email,password} = req.body
    const token = await authService.resetPassword(email,password)
    return sendResponse(res, 'Updated Password successfully', {token} , StatusCodes.OK)
})