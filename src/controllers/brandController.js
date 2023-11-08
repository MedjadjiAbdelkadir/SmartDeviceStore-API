const { statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getBrands, getBrand, createBrand, updateBrand, deleteBrand, restoreBrand, forceDeleteBrand} = require('../services/brandService')

/*
    @desc    Get list of Brands
    @route   GET /api/brands
    @access  Public
*/
exports.getBrands = async (req, res) =>{
    try {
        const brands = await  getBrands()
        if(brands.length > 0){
            return sendSuccessResponse(res , 'success' , {brands} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No Brands' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)

        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Get Brand by ID
    @route   GET /api/brands/:id
    @access  Public
*/
exports.getBrand = async (req, res) =>{
    try {
        const brand = await  getBrand({id:req.params.id})
        if(brand){
            return sendSuccessResponse(res , 'success' , {brand} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Brand Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }    
}

/*
    @desc    Create Brand
    @route   POST /api/brands
    @access  Public
*/

exports.createBrand =async (req, res , next)=>{
    try {
        const { name ,slug, image} = req.body
        const brand = await  createBrand({name,slug, image})
        return sendSuccessResponse(res , 'Brand created successfully' , {brand} , statusCodes.CREATED) 
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}


/*
    @desc    Update Brand
    @route   PATCH /api/brands
    @access  Public
*/
exports.updateBrand = async (req, res) =>{
    try {
        const { id, name } = req.body 
        const brand = await  updateBrand({id, name})
        if(brand){
            return sendSuccessResponse(res , 'Brand updated successfully' , {brand} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Brand Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Delete Brand by ID
    @route   DELETE /api/brands/:id
    @access  Public
*/
exports.deleteBrand = async (req, res) =>{
    try {
        const brand = await  getBrand({id:req.params.id})
        if(brand){
            await  deleteBrand({id:req.params.id})
            return sendSuccessResponse(res , 'success' , null , statusCodes.NO_CONTENT)
        }
        return sendErrorResponse(res , 'This Brand Not Found' , statusCodes.NOT_FOUND)   
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }  
}

/*
    @desc    Restore Brand by ID
    @route   PATCH /api/brands/restore/:id
    @access  Public
*/
exports.restoreBrand = async (req, res) =>{
    try {
        const brand = await  restoreBrand({id:req.params.id})
        if(brand){
            return sendSuccessResponse(res , 'success' , brand , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Brand Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Force Delete Brand by ID
    @route   DELETE /api/brands/force/:id
    @access  Public
*/
exports.forceDeleteBrand = async (req, res) =>{
    try {
        const brand = await  forceDeleteBrand({id:req.params.id})
    if(brand){
        return sendSuccessResponse(res , 'success' , null , statusCodes.OK)
    }
    return sendErrorResponse(res , 'This Brand Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}