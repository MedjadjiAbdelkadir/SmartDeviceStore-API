const asyncHandler = require("../utils/errorHandler")
const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")

const attributeService = require("../services/attributeService")

/*
    @desc    Get All Attributes
    @route   GET baseURL/api/v1/attributes
    @access  Public
*/
exports.getAttributes = asyncHandler( async (req, res, next) =>{
    const { page = 1, limit = 5, sortBy, sortOrder, name, slug } = req.query;
    const filters = {
        page: +page ? page :1,
        limit:+limit ? +limit :5,
        sortBy, 
        sortOrder, 
        name, 
        slug
    }
    const attributes = await  attributeService.getAttributes(filters)
    return sendResponse(res, 'success', {attributes} , StatusCodes.OK)
})

/*
    @desc    Get Attribute By ID
    @route   GET baseURL/api/v1/attributes/:id
    @access  Public
*/
exports.getAttribute = asyncHandler( async (req, res, next)=>{
    const attribute = await  attributeService.getAttribute(req.params.id)
    return sendResponse(res, 'success', {attribute} , StatusCodes.OK)
})

/*
    @desc    Create Attribute 
    @route   POST baseURL/api/v1/attributes
    @access  PRIVATE | ADMIN
*/
exports.createAttribute = asyncHandler( async (req, res, next)=>{
    const { name ,slug} = req.body
    const attribute = await  attributeService.createBrand(name ,slug)
    return sendResponse(res, 'Attribute created successfully', {attribute} , StatusCodes.CREATED)
})

/*
    @desc    Update Attribute 
    @route   PATCH baseURL/api/v1/attributes/:id
    @access  PRIVATE | ADMIN
*/
exports.updateAttribute = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    const {name , slug} = req.body
    const attribute = await  attributeService.updateAttribute(id, name ,slug)
    return sendResponse(res, 'Attribute updated successfully', {attribute} , StatusCodes.OK)

})

/*
    @desc    Delete Attribute 
    @route   DELETE baseURL/api/v1/attributes/:id
    @access  PRIVATE | ADMIN
*/
exports.deleteAttribute = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    await  attributeService.deleteBrand(id)
    return sendResponse(res, 'Brand deleted successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Get All Attributes
    @route   GET baseURL/api/v1/attributes/trash
    @access  PRIVATE | ADMIN
*/
exports.allTrashAttributes = asyncHandler( async (req, res, next)=>{
    const attribute = await  attributeService.allTrashAttributes()
    return sendResponse(res, 'All Trash Attribute', {attribute}, StatusCodes.OK)

})

/*
    @desc    Restore Attribute by ID 
    @route   PATCH baseURL/api/v1/attributes/restore/:id
    @access  PRIVATE | ADMIN
*/
exports.restoreAttribute = asyncHandler( async (req, res, next)=>{
    const attribute = await  attributeService.restoreAttribute(req.params.id)
    return sendResponse(res, 'Restore Attribute successfully', {attribute}, StatusCodes.OK)
})

/*
    @desc    force Delete Attribute
    @route   DELETE baseURL/api/v1/attributes/force-delete/:id
    @access  PRIVATE | ADMIN
*/
exports.forceDeleteAttribute = asyncHandler( async (req, res, next)=>{
    await  attributeService.forceDeleteAttribute(req.params.id)
    return sendResponse(res, 'Force Deleted Attribute successfully', null, StatusCodes.NO_CONTENT)
})
