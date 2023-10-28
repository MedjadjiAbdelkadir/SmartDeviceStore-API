const { statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getCoupons, getCoupon, createCoupon, updateCoupon, deleteCoupon} = require('../services/couponService')

/*
    @desc    Get All Coupons
    @route   GET /api/coupons
    @access  Private|Admin & Manager
*/

exports.getCoupons = async (req, res) =>{
    try {
        const coupons = await  getCoupons()
        if(coupons.length > 0){
            return sendSuccessResponse(res , 'success' , {coupons} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No Coupons' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Get Single Coupon
    @route   GET /api/coupons/:id
    @access  Private|Admin & Manager
*/
exports.getCoupon = async (req, res) =>{
    try {
        const coupon = await  getCoupon(req.params.id)
        if(coupon){
            return sendSuccessResponse(res , 'success' , {coupon} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Coupon Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)

        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }    
}

/*
    @desc    Create Coupon
    @route   POST /api/coupons
    @access  Private|Admin & Manager
*/

exports.createCoupon =async (req, res , next)=>{
    try {
        const coupon = await  createCoupon(req.body)
        return sendSuccessResponse(res , 'Coupon created successfully' , {coupon} , statusCodes.CREATED) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}


/*
    @desc    Update Coupon
    @route   PATCH /api/coupons
    @access  Private|Admin & Manager
*/
exports.updateCoupon = async (req, res) =>{
    try {
        const coupon = await  updateCoupon(req.body)
        if(coupon){
            return sendSuccessResponse(res , 'Coupon updated successfully' , {coupon} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Coupon Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Delete Single Coupon
    @route   DELETE /api/coupons/:id
    @access  Private|Admin & Manager
*/
exports.deleteCoupon = async (req, res) =>{
    try {
        await deleteCoupon(req.params.id)
        return sendSuccessResponse(res , 'success' , null , statusCodes.NO_CONTENT)
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }  
}
