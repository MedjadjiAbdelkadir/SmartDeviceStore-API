const { statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getUsers, getUser, updateUser} = require('../services/userService')

/*
    @desc    Get list of User
    @route   GET /api/users
    @access  Private/Admin
*/
exports.getUsers = async (req, res) =>{
    try {
        const users = await  getUsers()
        if(users.length > 0){
            return sendSuccessResponse(res , 'success' , {users} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No Users' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Get User by ID
    @route   GET /api/users/:id
    @access  Private/Admin || Private/Auth
*/
exports.getUser = async (req, res) =>{
    try {
        const user = await  getUser({id:req.params.id})
        if(user){
            return sendSuccessResponse(res , 'success' , {user} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This User Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }    
}

/*
    @desc    Update User
    @route   PATCH /api/users
    @access  Private/Auth
*/
exports.updateUser = async (req, res) =>{
    try {
        const user = await  updateUser(req.body )
        if(user){
            return sendSuccessResponse(res , 'User updated successfully' , {user} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This User Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}
