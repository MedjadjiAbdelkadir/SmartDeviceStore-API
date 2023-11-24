const asyncHandler = require("../utils/errorHandler")
const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")

const categoryService = require("../services/categoryService")

/*
    @desc    Get All Categories
    @route   GET baseURL/api/v1/categories
    @access  Public
*/
exports.getCategories = asyncHandler( async (req, res, next) =>{
    const { page = 1, limit = 5, sortBy, sortOrder, name, slug } = req.query;
    const filters = {
        page: +page ? page :1,
        limit:+limit ? +limit :5,
        sortBy, 
        sortOrder, 
        name, 
        slug
    }
    const categories = await  categoryService.getCategories(filters)
    return sendResponse(res, 'success', {categories} , StatusCodes.OK)
})

/*
    @desc    Get Category By ID
    @route   GET baseURL/api/v1/categories/:id
    @access  Public
*/
exports.getCategory = asyncHandler( async (req, res, next)=>{
    const category = await  categoryService.getCategory(req.params.id)
    return sendResponse(res, 'success', {category} , StatusCodes.OK)
})

/*
    @desc    Create Category 
    @route   POST baseURL/api/v1/categories
    @access  PRIVATE | ADMIN
*/
exports.createCategory= asyncHandler( async (req, res, next)=>{
    const { name ,slug} = req.body
    const category = await  categoryService.createCategory(name ,slug)
    return sendResponse(res, 'Category created successfully', {category} , StatusCodes.CREATED)
})

/*
    @desc    Update Category 
    @route   PATCH baseURL/api/v1/categories/:id
    @access  PRIVATE | ADMIN
*/
exports.updateCategory = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    const {name , slug} = req.body
    const category = await  categoryService.updateCategory(id, name ,slug)
    return sendResponse(res, 'Category updated successfully', {category} , StatusCodes.OK)

})

/*
    @desc    Delete Category 
    @route   DELETE baseURL/api/v1/categories/:id
    @access  PRIVATE | ADMIN
*/
exports.deleteCategory = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    await  categoryService.deleteCategory(id)
    return sendResponse(res, 'Category deleted successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Get All Trash Categories
    @route   GET baseURL/api/v1/categories/trash
    @access  PRIVATE | ADMIN
*/
exports.allTrashCategories = asyncHandler( async (req, res, next)=>{
    const category = await  categoryService.allTrashCategories()
    return sendResponse(res, 'All Trash Category', {category}, StatusCodes.OK)

})

/*
    @desc    Restore Category by ID 
    @route   PATCH baseURL/api/v1/categories/restore/:id
    @access  PRIVATE | ADMIN
*/
exports.restoreCategory = asyncHandler( async (req, res, next)=>{
    const category = await  categoryService.restoreCategory(req.params.id)
    return sendResponse(res, 'Restore Category successfully', {category}, StatusCodes.OK)
})

/*
    @desc    force Delete Category
    @route   DELETE baseURL/api/v1/categories/force-delete/:id
    @access  PRIVATE | ADMIN
*/
exports.forceDeleteCategory= asyncHandler( async (req, res, next)=>{
    await  categoryService.forceDeleteCategory(req.params.id)
    return sendResponse(res, 'Force Deleted Category successfully', null, StatusCodes.NO_CONTENT)
})
