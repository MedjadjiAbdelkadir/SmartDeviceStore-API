const express = require('express')

const { 
    getProducts, getProduct, createProduct, updateProduct, 
    deleteProduct, restoreProduct, forceDeleteProduct 
} = require('../controllers/productController')

const { 
    getProductValidator, createProductValidator, updateProductValidator, 
    restoreProductValidator, forceDeleteProductValidator 
} = require('../utils/validators/productValidator')



const router = express.Router()


router.get('/', getProducts)
router.get('/:id', getProductValidator , getProduct)
router.post('/', createProductValidator ,createProduct)
router.patch('/:id', updateProductValidator , updateProduct)
router.delete('/:id', deleteProduct)


router.patch('/restore/:id', restoreProductValidator ,restoreProduct )
router.delete('/force/:id', forceDeleteProductValidator ,forceDeleteProduct)
module.exports = router