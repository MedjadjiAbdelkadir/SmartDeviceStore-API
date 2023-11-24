const { Status } = require("./status")

class APIError extends Error {
    constructor(message, statusCode) {
        super(message,statusCode)
        this.statusCode = statusCode
        this.status = `${statusCode}`< 500? Status.FAIL : Status.ERROR
    }
}
module.exports = APIError
