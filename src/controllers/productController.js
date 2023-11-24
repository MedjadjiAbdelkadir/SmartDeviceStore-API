const asyncHandler = require("../utils/errorHandler")
const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")

const productService = require("../services/productService")

/*
    @desc    Get All Product
    @route   GET baseURL/api/v1/products
    @access  Public
*/
exports.getProducts = asyncHandler( async (req, res, next) =>{
    const { page = 1, limit = 5, sortBy, sortOrder, name, slug } = req.query;
    const filters = {
        page: +page ? page :1,
        limit:+limit ? +limit :5,
        sortBy, 
        sortOrder, 
        name, 
        slug
    }
    const products = await  productService.getProducts(filters)
    return sendResponse(res, 'success', {products} , StatusCodes.OK)
})

/*
    @desc    Get Product By ID
    @route   GET baseURL/api/v1/products/:id
    @access  Public
*/
exports.getProduct = asyncHandler( async (req, res, next)=>{
    const product = await  productService.getProduct(req.params.id)
    return sendResponse(res, 'success', {product} , StatusCodes.OK)
})

/*
    @desc    Create Product 
    @route   POST baseURL/api/v1/products
    @access  PRIVATE | ADMIN
*/
exports.createProduct = asyncHandler( async (req, res, next)=>{
    const product = await  productService.createProduct(req.body)
    return sendResponse(res, 'Product created successfully', {product} , StatusCodes.CREATED)
})

/*
    @desc    Update Product 
    @route   PATCH baseURL/api/v1/products/:id
    @access  PRIVATE | ADMIN
*/
exports.updateProduct = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    const product = await  productService.updateProduct(id, req.body)
    return sendResponse(res, 'Product updated successfully', {product} , StatusCodes.OK)

})

/*
    @desc    Delete Product 
    @route   DELETE baseURL/api/v1/products/:id
    @access  PRIVATE | ADMIN
*/
exports.deleteProduct = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    await  productService.deleteProduct(id)
    return sendResponse(res, 'Product deleted successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Get All Products
    @route   GET baseURL/api/v1/products/trash
    @access  PRIVATE | ADMIN
*/
exports.allTrashProducts = asyncHandler( async (req, res, next)=>{
    const product = await  productService.allTrashProducts()
    return sendResponse(res, 'All Trash Products', {product}, StatusCodes.OK)

})

/*
    @desc    Restore Product by ID 
    @route   PATCH baseURL/api/v1/products/restore/:id
    @access  PRIVATE | ADMIN
*/
exports.restoreProduct = asyncHandler( async (req, res, next)=>{
    const product = await  productService.restoreProduct(req.params.id)
    return sendResponse(res, 'Restore Product successfully', {product}, StatusCodes.OK)
})

/*
    @desc    force Delete Product
    @route   DELETE baseURL/api/v1/products/force-delete/:id
    @access  PRIVATE | ADMIN
*/
exports.forceDeleteProduct = asyncHandler( async (req, res, next)=>{
    await  productService.forceDeleteProduct(req.params.id)
    return sendResponse(res, 'Force Deleted Product successfully', null, StatusCodes.NO_CONTENT)
})
