const APIError = require("../apiError")
const { StatusCodes } = require("../status")

class UnauthorizedError extends APIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = UnauthorizedError;
