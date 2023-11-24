const { StatusCodes } = require("./status")

const sendResponse =  (res, message, data, statusCode = StatusCodes.OK)=>{
    res.status(statusCode).json({
		status: statusCode,
		message,
		data,
	})
}

module.exports = {
    sendResponse
}