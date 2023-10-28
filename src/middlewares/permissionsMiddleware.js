const ApiError = require('../utils/apiError');
const {statusCodes} = require('../utils/statusCodes');

// @desc    Authorization (User Permissions)
exports.allowedTo = (...roles) => async (req,res, next)=>{
    if (!roles.includes(req.user.role)) {
        return next(
            new ApiError('You are not allowed to access this route',statusCodes.FORBIDDEN)
        );
    }
    next();
}