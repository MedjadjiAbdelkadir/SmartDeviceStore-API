const ApiError = require("../utils/apiError");
const { statusCodes } = require("../utils/statusCodes");

const handleJwtInvalidSignature = () =>
  new ApiError('Invalid token, please login again..', statusCodes.UNAUTHORIZED);

const handleJwtExpired = () =>
  new ApiError('Expired token, please login again..', statusCodes.UNAUTHORIZED);

const handleError = (res, error) =>{
    res.status(error.statusCode || 400).json({
        'errorCode': error.statusCode,
        'status' : error.status,
        'message': error.message,
    });
}
const errorHandlerMiddleware = (error, req, res , next)=>{
    if (error.name === 'JsonWebTokenError') error = handleJwtInvalidSignature();
    if (error.name === 'TokenExpiredError') error = handleJwtExpired();
    handleError(res, error)
}

module.exports = errorHandlerMiddleware;