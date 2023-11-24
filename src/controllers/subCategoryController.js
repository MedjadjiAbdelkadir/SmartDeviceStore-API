const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')

const asyncHandler = require("../utils/errorHandler")
const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")

const subCategoryService = require("../services/subCategoryService")
const APIError = require("../utils/apiError")

/*
    @desc    Get All SubCategories
    @route   GET baseURL/api/v1/subcategories
    @access  Public
*/
exports.getSubCategories = asyncHandler( async (req, res, next) =>{
    const { page = 1, limit = 5, sortBy, sortOrder, name, slug } = req.query;
    const filters = {
        page: +page ? page :1,
        limit:+limit ? +limit :5,
        sortBy, 
        sortOrder, 
        name, 
        slug
    }
    const subcategories = await  subCategoryService.getSubCategories(filters)
    return sendResponse(res, 'success', {subcategories} , StatusCodes.OK)
})

/*
    @desc    Get SubCategory By ID
    @route   GET baseURL/api/v1/subcategories/:id
    @access  Public
*/
exports.getSubCategory = asyncHandler( async (req, res, next)=>{
    const subcategory = await  subCategoryService.getSubCategory(req.params.id)
    return sendResponse(res, 'success', {subcategory} , StatusCodes.OK)
})

/*
    @desc    Create SubCategory 
    @route   POST baseURL/api/v1/subcategories
    @access  PRIVATE | ADMIN
*/
exports.createSubCategory= asyncHandler( async (req, res, next)=>{
    const { categoryId, name ,slug} = req.body
    const subCategory = await  subCategoryService.createSubCategory(categoryId, name ,slug)
    return sendResponse(res, 'SubCategory created successfully', {subCategory} , StatusCodes.CREATED)
})

/*
    @desc    Update SubCategory 
    @route   PATCH baseURL/api/v1/subcategories/:id
    @access  PRIVATE | ADMIN
*/
exports.updateSubCategory = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    const {categoryId ,name , slug} = req.body
    const subCategory = await  subCategoryService.updateSubCategory(id, categoryId, name ,slug)
    return sendResponse(res, 'SubCategory updated successfully', {subCategory} , StatusCodes.OK)

})

/*
    @desc    Delete SubCategory 
    @route   DELETE baseURL/api/v1/subcategories/:id
    @access  PRIVATE | ADMIN
*/
exports.deleteSubCategory = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    await  subCategoryService.deleteSubCategory(id)
    return sendResponse(res, 'SubCategory deleted successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Get All Trash SubCategories
    @route   GET baseURL/api/v1/subcategories/trash
    @access  PRIVATE | ADMIN
*/
exports.allTrashSubCategories = asyncHandler( async (req, res, next)=>{
    const subCategory = await  subCategoryService.allTrashSubCategories()
    return sendResponse(res, 'All Trash SubCategory', {subCategory}, StatusCodes.OK)

})

/*
    @desc    Restore SubCategory by ID 
    @route   PATCH baseURL/api/v1/subcategories/restore/:id
    @access  PRIVATE | ADMIN
*/
exports.restoreSubCategory = asyncHandler( async (req, res, next)=>{
    const subCategory = await  subCategoryService.restoreSubCategory(req.params.id)
    return sendResponse(res, 'Restore Category successfully', {subCategory}, StatusCodes.OK)
})

/*
    @desc    force Delete SubCategory
    @route   DELETE baseURL/api/v1/subcategories/force-delete/:id
    @access  PRIVATE | ADMIN
*/
exports.forceDeleteSubCategory= asyncHandler( async (req, res, next)=>{
    await  subCategoryService.forceDeleteSubCategory(req.params.id)
    return sendResponse(res, 'Force Deleted SubCategory successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Resize Create SubCategory Image  Middleware
    @used : buffer && sharp package
*/
exports.resizeCreateSubCategoryImage = asyncHandler(async (req, res, next)=>{
    if(req.file && req.file.buffer){
        const filename= `subcategories-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`src/uploads/subcategories/${filename}`)
        .then(()=> {
            req.body.image = filename
            console.log(req.body.image);
        }).catch(err => new APIError(err.message , StatusCodes.BAD_REQUEST))
    }
    next()
})

/*
    @desc    Resize Update SubCategory Image  Middleware
    @used : buffer && sharp package
*/
exports.resizeUpdateSubCategoryImage = asyncHandler(async (req, res, next)=>{
    if(req.file && req.file.buffer){

        // Remove current image from src/uploads/brands/url-images

        const filename= `subcategories-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`src/uploads/subcategories/${filename}`)
        .then(()=> {
            req.body.image = filename
            console.log(req.body.image);
        }).catch(err => new APIError(err.message , StatusCodes.BAD_REQUEST))
    }
    next()
})