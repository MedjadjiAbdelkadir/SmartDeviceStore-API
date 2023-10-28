const { statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getReviews, getReview, createReview, updateReview, deleteReview, restoreReview, forceDeleteReview} = require('../services/reviewService')

/*
    @desc    Get All Reviews
    @route   GET /api/reviews
    @access  Public
*/

exports.getReviews = async (req, res) =>{
    try {
        const reviews = await  getReviews()
        if(reviews.length > 0){
            return sendSuccessResponse(res , 'success' , {reviews} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No Reviews' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Get Single Review
    @route   GET /api/reviews/:id
    @access  Public
*/
exports.getReview = async (req, res) =>{
    try {
        const review = await  getReview({id:req.params.id})
        if(review){
            return sendSuccessResponse(res , 'success' , {review} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Review Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)

        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }    
}

// Nested route (Create)
exports.setProductIDAndUserIdToBody = (req, res, next) => {
    if (!req.body.productId) req.body.productId = req.params.productId
    if (!req.body.userId){
        req.body.userId = req.user.id.toString()
    }
    next()
};

/*
    @desc    Create Review
    @route   POST /api/reviews
    @access  Private/User
*/

exports.createReview =async (req, res , next)=>{
    try {
        const review = await  createReview(req.body)
        return sendSuccessResponse(res , 'Review created successfully' , {review} , statusCodes.CREATED) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}


/*
    @desc    Update Review
    @route   PATCH /api/reviews
    @access  Private/User
*/
exports.updateReview = async (req, res) =>{
    try {
        const review = await  updateReview(req.body)
        if(review){
            return sendSuccessResponse(res , 'Review updated successfully' , {review} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Review Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Delete Single Review
    @route   DELETE /api/reviews/:id
    @access  Private/User
*/
exports.deleteReview = async (req, res) =>{
    try {
        await deleteReview(req.params.id)
        return sendSuccessResponse(res , 'success' , null , statusCodes.NO_CONTENT)
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)

        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }  
}

/*
    @desc    Restore Single Review
    @route   PATCH /api/reviews/restore/:id
    @access  Private/User
*/
exports.restoreReview = async (req, res) =>{
    try {
        const review = await  restoreReview(req.params.id)
        if(review){
            return sendSuccessResponse(res , 'success' , review , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Review Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Force Delete Review 
    @route   DELETE /api/reviews/force/:id
    @access  Private/User
*/
exports.forceDeleteReview = async (req, res) =>{
    try {
        const review = await  forceDeleteReview({id:req.params.id})
    if(review){
        return sendSuccessResponse(res , 'success' , null , statusCodes.OK)
    }
    return sendErrorResponse(res , 'This Review Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}