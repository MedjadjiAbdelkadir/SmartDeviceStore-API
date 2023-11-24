const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')

const asyncHandler = require("../utils/errorHandler")
const APIError = require("../utils/apiError")
const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")

const userService = require("../services/userService")

/*
    @desc    Get Profile
    @route   GET baseURL/api/v1/profile
    @access  PRIVATE | User
*/
exports.getProfile = asyncHandler( async (req, res, next)=>{
    const profile = await  userService.getProfile(req.user.id)
    return sendResponse(res, 'success', {profile} , StatusCodes.OK)
})


/*
    @desc    Update Profile 
    @route   PATCH baseURL/api/v1/profile
    @access  PRIVATE | User
*/
exports.updateProfile = asyncHandler( async (req, res, next)=>{
    const {id} = req.user.id
    const {firstName, lastName, phone} = req.body
    const profile = await  userService.updateProfile(id,firstName, lastName, phone)
    return sendResponse(res, 'Profile updated successfully', {profile} , StatusCodes.OK)
})


/*
    @desc    Update Avatar Profile 
    @route   PATCH baseURL/api/v1/profile/avatar
    @access  PRIVATE | User
*/
exports.updateAvatarProfile = asyncHandler( async (req, res, next)=>{
    const {id} = req.user.id
    const {image} = req.body
    const profile = await  userService.updateAvatarProfile(id,image)
    return sendResponse(res, 'Avatar Profile updated successfully', {profile} , StatusCodes.OK)
})

/*
    @desc    Delete Account 
    @route   DELETE baseURL/api/v1/profile
    @access  PRIVATE | User
*/
exports.deleteAccount = asyncHandler( async (req, res, next)=>{
    const {id} = req.user.id
    await  userService.deleteAccount(id)
    return sendResponse(res, 'Profile Account deleted successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Restore Account 
    @route   PATCH baseURL/api/v1/profile/restore
    @access  PRIVATE | User
*/
exports.restoreAccount = asyncHandler( async (req, res, next)=>{
    const profile = await  userService.restoreAccount(req.params.id)
    return sendResponse(res, 'Restore Profile Account successfully', {profile}, StatusCodes.OK)
})


/*
    @desc    Resize Create Avatar Profile   Middleware
    @used : buffer && sharp package
*/
exports.resizeCreateAvatarProfile = asyncHandler(async (req, res, next)=>{
    if(req.file && req.file.buffer){
        const filename= `users-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`src/uploads/users/${filename}`)
        .then(()=> {
            req.body.image = filename
            console.log(req.body.image);
        }).catch(err => new APIError(err.message , StatusCodes.BAD_REQUEST))
    }
    next()
})

/*
    @desc    Resize Update Avatar Profile  Middleware
    @used : buffer && sharp package
*/
exports.resizeUpdateAvatarProfile = asyncHandler(async (req, res, next)=>{
    if(req.file && req.file.buffer){

        // Remove current image from src/uploads/users/url-images

        const filename= `users-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`src/uploads/users/${filename}`)
        .then(()=> {
            req.body.image = filename
            console.log(req.body.image);
        }).catch(err => new APIError(err.message , StatusCodes.BAD_REQUEST))
    }
    next()
})
