const NotFoundError = require("./notFound")
const RouteNotFoundError = require("./routeNotFound")
const UnauthenticatedError = require("./unauthenticated")
const UnauthorizedError = require("./unauthorized")

module.exports = {
    NotFoundError,
    RouteNotFoundError,
    UnauthenticatedError,
    UnauthorizedError
}
