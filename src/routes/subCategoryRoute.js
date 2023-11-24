const express = require('express')

const { uploadSingleImageMiddleware } = require('../middleware/uploadImageMiddleware')

const { getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory, createSubCategory, allTrashSubCategories, restoreSubCategory, forceDeleteSubCategory, resizeCreateSubCategoryImage, resizeUpdateSubCategoryImage } = require('../controllers/subCategoryController')
const { getSubCategoryValidator, createSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator, restoreSubCategoryValidator, forceDeleteSubCategoryValidator } = require('../utils/validators/subCategoryValidator')
const { allowedTo } = require('../middleware/permissionsMiddleware')

const UploadSubCategoryImage = uploadSingleImageMiddleware('image')

const router = express.Router()

router.get('/' , getSubCategories)
router.get('/trash',allowedTo('admin'), allTrashSubCategories)
router.get('/:id' ,getSubCategoryValidator, getSubCategory)
router.use(allowedTo('admin'))
router.post('/',UploadSubCategoryImage,resizeCreateSubCategoryImage,createSubCategoryValidator, createSubCategory)
router.patch('/:id', UploadSubCategoryImage,resizeUpdateSubCategoryImage, updateSubCategoryValidator ,updateSubCategory)
router.delete('/:id', deleteSubCategoryValidator, deleteSubCategory)


router.patch('/restore/:id', restoreSubCategoryValidator , restoreSubCategory)
router.delete('/force-delete/:id', forceDeleteSubCategoryValidator ,forceDeleteSubCategory)
// trash
module.exports = router