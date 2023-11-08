const ApiError = require('../utils/apiError')
const statusCodes = require('../utils/statusCodes')

const routeNotFoundMiddleware = async (req,  res ,next) =>{
    const err =  new ApiError(`Can't find this route: ${req.originalUrl}`, statusCodes.NOT_FOUND)
    next(err)
}

module.exports = routeNotFoundMiddleware;