const express = require('express')

const { getBrands, getBrand, updateBrand, deleteBrand, createBrand, resizeCreateBrandImage, resizeUpdateBrandImage, allTrashBrands, restoreBrand, forceDeleteBrand } = require('../controllers/brandController')
const { getBrandValidator, createBrandValidator, updateBrandValidator, deleteBrandValidator, restoreBrandValidator, forceDeleteBrandValidator } = require('../utils/validators/brandValidator')
const { uploadSingleImageMiddleware } = require('../middleware/uploadImageMiddleware')
const { allowedTo } = require('../middleware/permissionsMiddleware')
const { auth } = require('../middleware/authMiddleware')

const UploadBrandImage = uploadSingleImageMiddleware('image')

const router = express.Router()

router.get('/' , getBrands)
router.get('/trash',auth, allowedTo('admin'), allTrashBrands)
router.get('/:id' ,getBrandValidator, getBrand)
router.use(auth)
router.use(allowedTo('admin'))
router.post('/',UploadBrandImage, resizeCreateBrandImage,createBrandValidator, createBrand)
router.patch('/:id', UploadBrandImage, resizeUpdateBrandImage, updateBrandValidator ,updateBrand)
router.delete('/:id', deleteBrandValidator, deleteBrand)


router.patch('/restore/:id', restoreBrandValidator , restoreBrand )
router.delete('/force-delete/:id', forceDeleteBrandValidator ,forceDeleteBrand)
// trash
module.exports = router