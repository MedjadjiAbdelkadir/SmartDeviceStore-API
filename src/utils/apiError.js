class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`< 500? 'fail' : 'error';
    }
}

module.exports = ApiError;