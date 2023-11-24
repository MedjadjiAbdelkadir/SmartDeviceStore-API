const { UnauthorizedError } = require("../utils/errors")
const { verifyToken } = require('../utils/tokenUtils')

const User = require('../models/user')

/*
    @desc   make sure the user is logged in
*/
exports.auth = async (req, res, next) =>{
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(
            new UnauthorizedError('You are not login, Please login to get access this route')
        )
    }
    await verifyToken(token).then(async(decoded)=>{
        const user = await User.findByPk(decoded.userId)
        if (!user) {
            return next( 
                new UnauthorizedError('The user that belong to this token does no longer exist')
            )
        }
    
        if (user.passwordChangedAt){
            const passChangedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10)
            if (passChangedTimestamp > decoded.iat) {
                return next(
                    new UnauthorizedError('User recently changed his password. please login again..')
                )
            }
        }

        req.user = user      
        next();

    }).catch((err)=>next(err))
}