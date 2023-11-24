const { UnauthorizedError } = require("../utils/errors")
const { StatusMessages, StatusCodes } = require("../utils/status")

const handleJwtInvalidSignature = () =>
    new UnauthorizedError('Invalid token, please login again..')

const handleJwtExpired = () =>
    new UnauthorizedError('Expired token, please login again..')


/*
    @desc  handle error response
*/
const handleError = (res, error) =>{
    res.status(error.statusCode || 500).json({
        'code': error.statusCode,
        'status' : error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        'message': error.message || StatusMessages.INTERNAL_SERVER_ERROR ,
    })
}

const errorHandlerMiddleware = (error, req, res , next)=>{
    if (error.name === 'JsonWebTokenError') error = handleJwtInvalidSignature()
    if (error.name === 'TokenExpiredError') error = handleJwtExpired()
    handleError(res, error)
}

module.exports = errorHandlerMiddleware