const ApiError = require('../utils/apiError');
const {statusCodes} = require('../utils/statusCodes');
const {verifyToken} = require('../utils/tokenUtils'); 

const User = require('../models/user');

// @desc   make sure the user is logged in
exports.auth = async (req, res, next) =>{
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(
            new ApiError('You are not login, Please login to get access this route',statusCodes.UNAUTHORIZED)
        )
    }

    await verifyToken(token).then(async(decoded)=>{
        const user = await User.findByPk(decoded.userId)
        if (!user) {
            return next( 
                new ApiError('The user that belong to this token does no longer exist',statusCodes.UNAUTHORIZED)
            );
        }
    
        if (user.passwordChangedAt){
            const passChangedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10)
            if (passChangedTimestamp > decoded.iat) {
                return next(
                  new ApiError('User recently changed his password. please login again..',statusCodes.UNAUTHORIZED)
                )
            }
        }

        req.user = user;      
        next();

    }).catch((err)=>next(err))

}
