const APIError = require("../apiError")
const { StatusCodes } = require("../status")

class UnauthenticatedError extends APIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
module.exports = UnauthenticatedError;