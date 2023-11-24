const fs = require('fs');
const APIError = require('../utils/apiError');
const { StatusCodes } = require('../utils/status');

/*
    @desc   Remove Files from Directory 
*/
exports.RemoveFile = (path) => async (req,res, next)=>{

    fs.unlink(path, (err)=>{
        if (err) {
            console.log('Could not delete the file.');
            next(new APIError('Could not delete the file.', StatusCodes.INTERNAL_SERVER_ERROR))
        } else {
            console.log('Successfully deleted the file');
            next()
        }
    })
    
}