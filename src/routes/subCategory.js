const express = require('express')

const { 
    getSubCategories, getSubCategory, createSubCategory, updateSubCategory, 
    deleteSubCategory, restoreSubCategory, forceDeleteSubCategory 
} = require('../controllers/subCategoryController')

const { 
    getSubCategoryValidator, createSubCategoryValidator, updateSubCategoryValidator, 
    deleteSubCategoryValidator, restoreSubCategoryValidator, forceDeleteSubCategoryValidator 
} = require('../utils/validators/subCategoryValidator')

const { uploadMultiImageMiddleware } = require('../middlewares/uploadImageMiddleware')
const {resizeSubCategoryImages} = require('../middlewares/resizeImageMiddleware')
// ------------------------------------------------------------------

// const UploadSubCategoryImage = uploadSingleImageMiddleware('image')

const UploadSubCategoryImage = uploadMultiImageMiddleware([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 8 }
])

const router = express.Router({mergeParams : true})

router.get('/', getSubCategories)
router.get('/:id', getSubCategoryValidator, getSubCategory)
router.post('/', UploadSubCategoryImage ,resizeSubCategoryImages, createSubCategoryValidator , createSubCategory)
router.patch('/:id', updateSubCategoryValidator , updateSubCategory)
router.delete('/:id', deleteSubCategoryValidator , deleteSubCategory)


router.patch('/restore/:id', restoreSubCategoryValidator , restoreSubCategory )
router.delete('/force/:id', forceDeleteSubCategoryValidator , forceDeleteSubCategory)
module.exports = router