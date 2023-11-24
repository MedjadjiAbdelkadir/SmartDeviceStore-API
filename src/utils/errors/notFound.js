const APIError = require("../apiError")
const { StatusCodes } = require("../status")


class NotFoundError extends APIError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;