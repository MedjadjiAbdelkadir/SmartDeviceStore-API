const errorHandlerMiddleware = require("./errorHandlerMiddleware");
const routeNotFoundMiddleware = require("./routeNotFoundMiddleware");

const middlewares = function(app) {
    app.all('*' , routeNotFoundMiddleware)
    app.use(errorHandlerMiddleware) 
}

module.exports = middlewares ;
