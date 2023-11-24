const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')

const asyncHandler = require("../utils/errorHandler")
const APIError = require("../utils/apiError")
const { sendResponse } = require("../utils/sendResponse")
const { StatusCodes } = require("../utils/status")

const brandService = require("../services/brandService")

/*
    @desc    Get All Brands
    @route   GET baseURL/api/v1/brands
    @access  Public
*/
exports.getBrands = asyncHandler( async (req, res, next) =>{
    const { page = 1, limit = 5, sortBy, sortOrder, name, slug } = req.query;
    const filters = {
        page: +page ? page :1,
        limit:+limit ? +limit :5,
        sortBy, 
        sortOrder, 
        name, 
        slug
    }
    const brands = await  brandService.getBrands(filters)
    return sendResponse(res, 'success', {brands} , StatusCodes.OK)
})

/*
    @desc    Get Brand By ID
    @route   GET baseURL/api/v1/brands/:id
    @access  Public
*/
exports.getBrand = asyncHandler( async (req, res, next)=>{
    const brand = await  brandService.getBrand(req.params.id)
    return sendResponse(res, 'success', {brand} , StatusCodes.OK)
})

/*
    @desc    Create Brand 
    @route   POST baseURL/api/v1/brands
    @access  PRIVATE | ADMIN
*/
exports.createBrand = asyncHandler( async (req, res, next)=>{
    const { name ,slug, image} = req.body
    const brand = await  brandService.createBrand(name ,slug, image)
    return sendResponse(res, 'Brand created successfully', {brand} , StatusCodes.CREATED)
})

/*
    @desc    Update Brand 
    @route   PATCH baseURL/api/v1/brands/:id
    @access  PRIVATE | ADMIN
*/
exports.updateBrand = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    const {name , slug , image} = req.body
    const brand = await  brandService.updateBrand(id, name ,slug, image)
    return sendResponse(res, 'Brand updated successfully', {brand} , StatusCodes.OK)

})

/*
    @desc    Delete Brand 
    @route   DELETE baseURL/api/v1/brands/:id
    @access  PRIVATE | ADMIN
*/
exports.deleteBrand = asyncHandler( async (req, res, next)=>{
    const {id} = req.params
    await  brandService.deleteBrand(id)
    return sendResponse(res, 'Brand deleted successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Get All Brands
    @route   GET baseURL/api/v1/brands/trash
    @access  PRIVATE | ADMIN
*/
exports.allTrashBrands = asyncHandler( async (req, res, next)=>{
    const brand = await  brandService.allTrashBrands()
    return sendResponse(res, 'All Trash Brand', {brand}, StatusCodes.OK)

})

/*
    @desc    Restore Brand by ID 
    @route   PATCH baseURL/api/v1/brands/restore/:id
    @access  PRIVATE | ADMIN
*/
exports.restoreBrand = asyncHandler( async (req, res, next)=>{
    const brand = await  brandService.restoreBrand(req.params.id)
    return sendResponse(res, 'Restore Brand successfully', {brand}, StatusCodes.OK)
})

/*
    @desc    force Delete Brand
    @route   DELETE baseURL/api/v1/brands/force-delete/:id
    @access  PRIVATE | ADMIN
*/
exports.forceDeleteBrand = asyncHandler( async (req, res, next)=>{
    await  brandService.forceDeleteBrand(req.params.id)
    return sendResponse(res, 'Force Deleted Brand successfully', null, StatusCodes.NO_CONTENT)
})

/*
    @desc    Resize Create Brand Image  Middleware
    @used : buffer && sharp package
*/
exports.resizeCreateBrandImage = asyncHandler(async (req, res, next)=>{
    if(req.file && req.file.buffer){
        const filename= `brands-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`src/uploads/brands/${filename}`)
        .then(()=> {
            req.body.image = filename
            console.log(req.body.image);
        }).catch(err => new APIError(err.message , StatusCodes.BAD_REQUEST))
    }
    next()
})

/*
    @desc    Resize Update Brand Image  Middleware
    @used : buffer && sharp package
*/
exports.resizeUpdateBrandImage = asyncHandler(async (req, res, next)=>{
    if(req.file && req.file.buffer){

        // Remove current image from src/uploads/brands/url-images

        const filename= `brands-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`src/uploads/brands/${filename}`)
        .then(()=> {
            req.body.image = filename
            console.log(req.body.image);
        }).catch(err => new APIError(err.message , StatusCodes.BAD_REQUEST))
    }
    next()
})
