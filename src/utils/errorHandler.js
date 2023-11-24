const APIError = require("./apiError")

const asyncHandler = (fn) => (req, res, next) => {
    fn(req, res, next).catch(async (err) => {
        next(new APIError(err.message))
    })
}

module.exports = asyncHandler









