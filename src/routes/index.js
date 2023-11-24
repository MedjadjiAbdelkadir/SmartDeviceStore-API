const express = require('express');

const router = express.Router();
const testRoutes = require('./testRoute')

const authRoutes = require('./authRoute')
const userRoutes = require('./userRoute')
const brandRoutes = require('./brandRoute')
const categoryRoutes = require('./categoryRoute')
const subCategoryRoutes = require('./subCategoryRoute')
const attributeRoutes = require('./attributeRoute')
const productRoutes = require('./productRoute')
const reviewRoutes = require('./reviewRoute')

router.use('/auth', authRoutes)
router.use('/profile', userRoutes)
router.use('/brands', brandRoutes)
router.use('/categories', categoryRoutes)
router.use('/subcategories', subCategoryRoutes)
router.use('/attributes', attributeRoutes)
router.use('/products', productRoutes)
router.use('/reviews', reviewRoutes)

router.use('/test', testRoutes)

module.exports = router;