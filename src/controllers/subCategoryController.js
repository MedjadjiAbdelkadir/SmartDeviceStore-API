const {statusCodes ,errorMessages} = require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getSubCategories , getSubCategory ,createSubCategory, updateSubCategory , deleteSubCategory , restoreSubCategory, forceDeleteSubCategory} = require('../services/subCategoryService')

/*
    @desc    Get list of SubCategories
    @route   GET /api/subcategories
    @access  Public
*/
exports.getSubCategories = async (req, res) =>{
    try {
        // let categoryId 
        // if(req.params.categoryId) {
        //     categoryId = req.params.categoryId 
        // }else{
        //     categoryId= null
        // }
    
        const subcategories = await  getSubCategories()
        if(subcategories.length > 0){
            return sendSuccessResponse(res , 'success' , {subcategories} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No SubCategories' , statusCodes.NOT_FOUND)
    } catch (error) {
        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 

        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

/*
    @desc    Get SubCategory by ID
    @route   GET /api/subcategories/:id
    @access  Public
*/
exports.getSubCategory =  async (req, res) =>{
    try {
        const subcategory = await  getSubCategory({id:req.params.id})
        if(subcategory){
            return sendSuccessResponse(res , 'success' , {subcategory} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This SubCategory Not Found' , statusCodes.NOT_FOUND)  
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    } 
}

/*
    @desc    Create SubCategory
    @route   POST /api/subcategories
    @access  Public
*/
exports.createSubCategory =  async (req, res) =>{
    try {
        const {name, slug,image , images, categoryId} = req.body
        const subcategory = await  createSubCategory({name, slug,image , images, categoryId})
        return sendSuccessResponse(res , 'SubCategory created successfully' , {subcategory} , statusCodes.CREATED) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

/*
    @desc    Update SubCategories
    @route   GET /api/subcategories
    @access  Public
*/
exports.updateSubCategory = async (req, res) =>{
    try {
        const {id, name, slug, categoryId} = req.body 
        const subcategory = await  updateSubCategory({id, name, slug, categoryId})
        if(subcategory){
            return sendSuccessResponse(res , 'Category updated successfully' , {subcategory} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No SubCategories' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

/*
    @desc    Delete SubCategory by ID
    @route   DELETE /api/subcategories/:id
    @access  Public
*/
exports.deleteSubCategory =  async (req, res) =>{
    try {
        const subcategory = await  getSubCategory({id:req.params.id})
        if(subcategory){
            await  deleteSubCategory({id:req.params.id})
            return sendSuccessResponse(res , 'success' , null , statusCodes.NO_CONTENT)
        }
        return sendErrorResponse(res , 'This SubCategory Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }
}

/*
    @desc    Restore SubCategory by ID
    @route   PATCH /api/subcategories/restore/:id
    @access  Public
*/
exports.restoreSubCategory =  async (req, res) =>{
    try {
        const subcategory = await  restoreSubCategory({id:req.params.id})
        if(subcategory){
            // await  deleteCategory({id:req.params.id})
            return sendSuccessResponse(res , 'success' , subcategory , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This SubCategory Not Found' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }   
}

/*
    @desc    Force Delete SubCategory by ID
    @route   DELETE /api/subcategories/force/:id
    @access  Public
*/
exports.forceDeleteSubCategory =  async (req, res) =>{
    try {
        const subcategory = await  forceDeleteSubCategory({id:req.params.id})
        if(subcategory){
            // await  deleteCategory({id:req.params.id})
            return sendSuccessResponse(res , 'success' , null , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This SubCategory Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR) 
    }    
}