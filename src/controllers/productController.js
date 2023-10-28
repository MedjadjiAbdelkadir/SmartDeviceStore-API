const { statusCodes , errorMessages }= require('../utils/statusCodes')
const { sendSuccessResponse , sendErrorResponse} = require('../utils/sendResponse')

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, restoreProduct, forceDeleteProduct} = require('../services/productService')

/*
    @desc    Get list of Products
    @route   GET /api/products
    @access  Public
*/
exports.getProducts = async (req, res) =>{
    try {
        const products = await  getProducts()
        if(products.length > 0){
            return sendSuccessResponse(res , 'success' , {products} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'No Products' , statusCodes.NOT_FOUND) 
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)
        
        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Get Product by ID
    @route   GET /api/products/:id
    @access  Public
*/
exports.getProduct = async (req, res) =>{
    try {
        const product = await  getProduct({id:req.params.id})
        if(product){
            return sendSuccessResponse(res , 'success' , {product} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Product Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)

        // return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }    
}

/*
    @desc    Create Product
    @route   POST /api/products
    @access  Public
*/

exports.createProduct =async (req, res , next)=>{
    try {
        // const { name , fields } = req.body
    //    fields.map(field => console.log(`id_attr : ${field.id} --> value : ${field.value}`))
        const product = await  createProduct(req.body)
        return sendSuccessResponse(res , 'Product created successfully' , {product} , statusCodes.CREATED) 
    } catch (error) {
        //return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)

        return sendErrorResponse(res , error.message, statusCodes.INTERNAL_SERVER_ERROR)
    }
}


/*
    @desc    Update Product
    @route   PATCH /api/subcategories
    @access  Public
*/
exports.updateProduct = async (req, res) =>{
    try {
        const {id}  = req.params
        const product = await  updateProduct(id, req.body)
        if(product){
            return sendSuccessResponse(res , 'Product updated successfully' , {product} , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Product Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Delete Product by ID
    @route   DELETE /api/products/:id
    @access  Public
*/
exports.deleteProduct = async (req, res) =>{
    try {
        const product = await  getProduct({id:req.params.id})
        if(product){
            await  deleteProduct({id:req.params.id})
            return sendSuccessResponse(res , 'success' , null , statusCodes.NO_CONTENT)
        }
        return sendErrorResponse(res , 'This Product Not Found' , statusCodes.NOT_FOUND)   
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }  
}

/*
    @desc    Restore Product by ID
    @route   PATCH /api/products/restore/:id
    @access  Public
*/
exports.restoreProduct = async (req, res) =>{
    try {
        const product = await  restoreProduct({id:req.params.id})
        if(product){
            return sendSuccessResponse(res , 'success' , product , statusCodes.OK)
        }
        return sendErrorResponse(res , 'This Product Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}

/*
    @desc    Force Delete Product by ID
    @route   DELETE /api/products/force/:id
    @access  Public
*/
exports.forceDeleteProduct = async (req, res) =>{
    try {
        const product = await  forceDeleteProduct({id:req.params.id})
    if(product){
        return sendSuccessResponse(res , 'success' , null , statusCodes.OK)
    }
    return sendErrorResponse(res , 'This Product Not Found' , statusCodes.NOT_FOUND)
    } catch (error) {
        return sendErrorResponse(res , errorMessages.INTERNAL_SERVER_ERROR, statusCodes.INTERNAL_SERVER_ERROR)
    }
}