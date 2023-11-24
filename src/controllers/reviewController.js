const asyncHandler = require("../utils/errorHandler")
const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")

const reviewService = require("../services/reviewService")

/*
    @desc    Get All Reviews
    @route   GET baseURL/api/v1/reviews
    @access  Public
*/
exports.getReviews = asyncHandler( async (req, res, next) =>{
    const { page = 1, limit = 5, sortBy, sortOrder, name, slug } = req.query;
    const filters = {
        page: +page ? page :1,
        limit:+limit ? +limit :5,
        sortBy, 
        sortOrder, 
        name, 
        slug
    }
    const reviews = await  reviewService.getReviews(filters)
    return sendResponse(res, 'success', {reviews} , StatusCodes.OK)
})

/*
    @desc    Get Review By ID
    @route   GET baseURL/api/v1/reviews/:id
    @access  Public
*/
exports.getReview = asyncHandler( async (req, res, next)=>{
    const review = await  reviewService.getReview(req.params.id)
    return sendResponse(res, 'success', {review} , StatusCodes.OK)
})

/*
    @desc    Create Review 
    @route   POST baseURL/api/v1/reviews
    @access  PRIVATE | ADMIN
*/
exports.createReview = asyncHandler( async (req, res, next)=>{
    const review = await  reviewService.Review(req.body)
    return sendResponse(res, 'Review created successfully', {review} , StatusCodes.CREATED)
})

/*
    @desc    Update Review 
    @route   PATCH baseURL/api/v1/reviews/:id
    @access  PRIVATE | ADMIN
*/
exports.updateReview = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    const review = await  reviewService.updateReview(id, req.body)
    return sendResponse(res, 'Review updated successfully', {review} , StatusCodes.OK)

})

/*
    @desc    Delete Review 
    @route   DELETE baseURL/api/v1/reviews/:id
    @access  PRIVATE | ADMIN
*/
exports.deleteReview = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    await  reviewService.deleteReview(id)
    return sendResponse(res, 'Review deleted successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Get All Reviews
    @route   GET baseURL/api/v1/reviews/trash
    @access  PRIVATE | ADMIN
*/
exports.allTrashReviews = asyncHandler( async (req, res, next)=>{
    const reviews = await  reviewService.allTrashReviews()
    return sendResponse(res, 'All Trash Reviews', {reviews}, StatusCodes.OK)

})

/*
    @desc    Restore Review by ID 
    @route   PATCH baseURL/api/v1/reviews/restore/:id
    @access  PRIVATE | ADMIN
*/
exports.restoreReview = asyncHandler( async (req, res, next)=>{
    const review = await  reviewService.restoreReview(req.params.id)
    return sendResponse(res, 'Restore Review successfully', {review}, StatusCodes.OK)
})

/*
    @desc    force Delete Review
    @route   DELETE baseURL/api/v1/reviews/force-delete/:id
    @access  PRIVATE | ADMIN
*/
exports.forceDeleteReview = asyncHandler( async (req, res, next)=>{
    await  reviewService.forceDeleteReview(req.params.id)
    return sendResponse(res, 'Force Deleted Review successfully', null, StatusCodes.NO_CONTENT)
})
