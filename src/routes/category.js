const express = require('express')

const { 
    getCategories, getCategory, createCategory, updateCategory, 
    deleteCategory, restoreCategory, forceDeleteCategory 
} = require('../controllers/categoryController')

const { 
    getCategoryValidator, createCategoryValidator, updateCategoryValidator, 
    restoreCategoryValidator, forceDeleteCategoryValidator 
} = require('../utils/validators/categoryValidator')

// const subCategoryRoutes = require('./subCategory')

const router = express.Router()

// router.use('/:categoryId/subcategories' , subCategoryRoutes)

router.get('/', getCategories)
router.get('/:id', getCategoryValidator , getCategory)
router.post('/', createCategoryValidator ,createCategory)
router.patch('/:id', updateCategoryValidator , updateCategory)
router.delete('/:id', deleteCategory)


router.patch('/restore/:id', restoreCategoryValidator ,restoreCategory )
router.delete('/force/:id', forceDeleteCategoryValidator ,forceDeleteCategory)
module.exports = router