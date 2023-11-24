const express = require('express')

const { getProducts, getProduct, updateProduct, deleteProduct, createProduct, allTrashProducts, restoreProduct, forceDeleteProduct } = require('../controllers/productController')
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator, restoreProductValidator, forceDeleteProductValidator } = require('../utils/validators/productValidator')
const { allowedTo } = require('../middleware/permissionsMiddleware')


const router = express.Router()

router.get('/' , getProducts)
router.get('/trash',allowedTo('admin'), allTrashProducts)
router.get('/:id' ,getProductValidator, getProduct)
router.use(allowedTo('admin'))
router.post('/',createProductValidator, createProduct)
router.patch('/:id',  updateProductValidator ,updateProduct)
router.delete('/:id', deleteProductValidator, deleteProduct)


router.patch('/restore/:id', restoreProductValidator , restoreProduct)
router.delete('/force-delete/:id', forceDeleteProductValidator ,forceDeleteProduct)
// trash
module.exports = router