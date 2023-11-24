const { UnauthorizedError } = require("../utils/errors");

/*
    @desc   Authorization (User Permissions)
*/
exports.allowedTo = (...roles) => async (req,res, next)=>{
    if (!roles.includes(req.user.role)) {
        return next(
            new UnauthorizedError('You are not allowed to access this route')
        )
    }
    next()
}
