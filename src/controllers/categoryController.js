const {statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getCategories, getCategory, createCategory, updateCategory, deleteCategory, restoreCategory, forceDeleteCategory} = require('../services/categoryService')

/*
    @desc    Get list of categories
    @route   GET /api/categories
    @access  Public
*/
exports.getCategories = async (req, res) =>{
    try {
        const categories = await  getCategories()
        if(categories.length > 0){
            return sendSuccessResponse(res , 'success' , {categories} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No categories' , statusCodes.NOT_FOUND)        
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR) 

        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

/*
    @desc    Get Category by ID
    @route   GET /api/categories/:id
    @access  Public
*/
exports.getCategory =async (req, res) =>{
    try {
        const category = await  getCategory({id:req.params.id})
        if(category){
            return sendSuccessResponse(res , 'success' , {category} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Category Not Found' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }    
}

/*
    @desc    Create Category
    @route   POST /api/categories
    @access  Public
*/
exports.createCategory = async (req, res) =>{
    try {
        const { name, slug , image} = req.body
        const category = await  createCategory({name,slug , image})
        return sendSuccessResponse(res , 'Category created successfully' , {category} , statusCodes.CREATED) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

// asyncHandler( )

/*
    @desc    Update Category
    @route   PATCH /api/subcategories
    @access  Public
*/
exports.updateCategory = async (req, res) =>{
    try {
        const { id, name, slug, image} = req.body 
        const category = await  updateCategory({id, name , slug , image})
        if(category){
            return sendSuccessResponse(res , 'Category updated successfully' , {category} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Category Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

/*
    @desc    Delete Category by ID
    @route   DELETE /api/categories/:id
    @access  Public
*/
exports.deleteCategory =async (req, res) =>{
    try {
        const category = await  getCategory({id:req.params.id})
        if(category){
            await  deleteCategory({id:req.params.id})
            return sendSuccessResponse(res , 'success' , null , statusCodes.NO_CONTENT)
        }
        return sendErrorResponse(res , 'This Category Not Found' , statusCodes.NOT_FOUND)   
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    } 
}

/*
    @desc    Restore Category by ID
    @route   PATCH /api/categories/restore/:id
    @access  Public
*/

exports.restoreCategory = async (req, res) =>{
    try {
        const category = await  restoreCategory({id:req.params.id})
        if(category){
            return sendSuccessResponse(res , 'success' , category , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Category Not Found' , statusCodes.NOT_FOUND)    
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

/*
    @desc    Force Delete Category by ID
    @route   DELETE /api/categories/force/:id
    @access  Public
*/


exports.forceDeleteCategory = async (req, res) => {
    try {
        const category = await  forceDeleteCategory({id:req.params.id})
        if(category){
            return sendSuccessResponse(res , 'success' , null , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Category Not Found' , statusCodes.NOT_FOUND)
        
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}