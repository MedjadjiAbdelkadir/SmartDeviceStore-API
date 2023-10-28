// eslint-disable-next-line default-param-last
module.exports.sendSuccessResponse = async (res,message='success', data, statusCode = 200) => 
    res.status(statusCode).json({
		status: statusCode,
		message,
		data,
	})

// eslint-disable-next-line default-param-last
module.exports.sendErrorResponse = (res,  message='error', statusCode = 500)=>
    res.status(statusCode).json({
		status: statusCode,
		error  : message,
	})