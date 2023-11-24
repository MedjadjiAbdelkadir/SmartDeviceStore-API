const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY
const EXPIRATION = process.env.JWT_EXPIRATION

const createToken = async (payload) =>
    await jwt.sign({userId : payload},SECRET_KEY,{
        expiresIn : EXPIRATION
    })
    
const verifyToken = async (token)=>{
    try {
        const decode = jwt.verify(token , SECRET_KEY)
        return decode;
    } catch (err) {
        throw err
    }  
}
module.exports = {
    createToken,
    verifyToken
}