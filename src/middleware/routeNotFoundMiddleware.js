const { RouteNotFoundError } = require("../utils/errors");

const routeNotFoundMiddleware = async (req, res, next) =>{
    const err =  new RouteNotFoundError(`Can't find this route: ${req.originalUrl}`)
    next(err)
}

module.exports = routeNotFoundMiddleware;