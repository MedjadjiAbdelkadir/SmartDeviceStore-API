const { StatusCodes, Status } = require("./status")

const sendBadRequestResponse = (res, error) =>res.status(StatusCodes.BAD_REQUEST).json({ 
        code: StatusCodes.BAD_REQUEST,
        status :  Status.FAIL,
        errors: error
    })
    
module.exports = sendBadRequestResponse