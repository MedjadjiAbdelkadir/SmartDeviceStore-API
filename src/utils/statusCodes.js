exports.statusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION:203,
    NO_CONTENT: 204,

    BAD_REQUEST:400,
    UNAUTHORIZED: 401,
    FORBIDDEN : 403,
    NOT_FOUND:404,
    METHOD_NOT_ALLOWED:405,

    INTERNAL_SERVER_ERROR:500,
}
exports.errorMessages = {
    OK: "Ok",
    CREATED: "Created",
    ACCEPTED: "Accepted",
    NON_AUTHORITATIVE_INFORMATION:"Non-Authoritative Information",
    NO_CONTENT: "No Content",

    BAD_REQUEST:"Bad Request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN : "Forbidden",
    NOT_FOUND:"Not Found",
    METHOD_NOT_ALLOWED:"Method Not Allowed",
    INTERNAL_SERVER_ERROR : 'Internal Server Error', 
}