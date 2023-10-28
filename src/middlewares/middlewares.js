const routeNotFoundMiddleware = require('./routeNotFoundMiddleware');
const errorHandlerMiddleware = require('./errorHandlerMiddleware');

const middlewares = function(app) {
    app.all('*' , routeNotFoundMiddleware)
    app.use(errorHandlerMiddleware) 
}

module.exports = middlewares ;