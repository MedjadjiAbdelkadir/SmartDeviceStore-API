const APIError = require("../apiError")
const { StatusCodes } = require("../status")

class RouteNotFoundError extends APIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = RouteNotFoundError;