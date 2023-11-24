const express = require('express')

const { getCategories, getCategory, updateCategory, deleteCategory, createCategory,  allTrashCategories, restoreCategory, forceDeleteCategory } = require('../controllers/categoryController')
const { getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, restoreCategoryValidator, forceDeleteCategoryValidator } = require('../utils/validators/categoryValidator')
const { allowedTo } = require('../middleware/permissionsMiddleware')


const router = express.Router()

router.get('/' , getCategories)
router.get('/trash',allowedTo('admin'), allTrashCategories)
router.get('/:id' ,getCategoryValidator, getCategory)
// router.use(allowedTo('admin'))
router.post('/',createCategoryValidator, createCategory)
router.patch('/:id',  updateCategoryValidator ,updateCategory)
router.delete('/:id', deleteCategoryValidator, deleteCategory)


router.patch('/restore/:id', restoreCategoryValidator , restoreCategory)
router.delete('/force-delete/:id', forceDeleteCategoryValidator ,forceDeleteCategory)
// trash
module.exports = router