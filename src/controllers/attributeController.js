const { statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getAttributes, getAttribute, createAttribute, updateAttribute, deleteAttribute, restoreAttribute, forceDeleteAttribute} = require('../services/attributeService')

/*
    @desc    Get list of Attributes
    @route   GET /api/attributes
    @access  Public
*/
exports.getAttributes = async (req, res) =>{
    try {
        const attributes = await  getAttributes()
        if(attributes.length > 0){
            return sendSuccessResponse(res , 'success' , {attributes} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No Attributes' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Get Attribute by ID
    @route   GET /api/attributes/:id
    @access  Public
*/
exports.getAttribute = async (req, res) =>{
    try {
        const attribute = await  getAttribute({id:req.params.id})
        if(attribute){
            return sendSuccessResponse(res , 'success' , {attribute} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Attribute Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }    
}

/*
    @desc    Create Attribute
    @route   POST /api/attributes
    @access  Public
*/

exports.createAttribute =async (req, res , next)=>{
    try {
        const { name, slug } = req.body
        const attribute = await  createAttribute({name, slug})
        return sendSuccessResponse(res , 'Attribute created successfully' , {attribute} , statusCodes.CREATED) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}


/*
    @desc    Update Attribute
    @route   PATCH /api/subcategories
    @access  Public
*/
exports.updateAttribute= async (req, res) =>{
    try {
        const { id, name, slug } = req.body 
        const attribute = await  updateAttribute({id, name,slug})
        if(attribute){
            return sendSuccessResponse(res , 'Attribute updated successfully' , {attribute} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Attribute Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Delete Attribute by ID
    @route   DELETE /api/attributes/:id
    @access  Public
*/
exports.deleteAttribute = async (req, res) =>{
    try {
        const attribute = await  getAttribute({id:req.params.id})
        if(attribute){
            await  deleteAttribute({id:req.params.id})
            return sendSuccessResponse(res , 'success' , null , statusCodes.NO_CONTENT)
        }
        return sendErrorResponse(res , 'This Attribute Not Found' , statusCodes.NOT_FOUND)   
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }  
}

/*
    @desc    Restore Attribute by ID
    @route   PATCH /api/attributes/restore/:id
    @access  Public
*/
exports.restoreAttribute = async (req, res) =>{
    try {
        const attribute = await  restoreAttribute({id:req.params.id})
        if(attribute){
            return sendSuccessResponse(res , 'success' , attribute , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Attribute Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Force Delete Attribute by ID
    @route   DELETE /api/attributes/force/:id
    @access  Public
*/
exports.forceDeleteAttribute = async (req, res) =>{
    try {
        const attribute = await  forceDeleteAttribute({id:req.params.id})
    if(attribute){
        return sendSuccessResponse(res , 'success' , null , statusCodes.OK)
    }
    return sendErrorResponse(res , 'This Brand Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}