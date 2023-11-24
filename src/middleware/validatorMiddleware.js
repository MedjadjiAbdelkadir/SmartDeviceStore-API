const { validationResult } = require('express-validator')
const sendBadRequestResponse = require('../utils/sendBadRequest');

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = errors.array().map(error => ({
            path: error.path,
            msg: error.msg,
            param: error.param,
        }));
        return sendBadRequestResponse(res,err)
    }
    next()
}

module.exports = validatorMiddleware