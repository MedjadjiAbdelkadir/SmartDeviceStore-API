const express = require('express');

const router = express.Router();

const categoryRoutes = require('./category')
const subCategoryRoutes = require('./subCategory')
const brandRoutes = require('./brand')
const attributeRoutes = require('./attribute')
const productRoutes = require('./product')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const reviewRoutes = require('./review')
const couponRoutes = require('./coupon')

router.use('/categories', categoryRoutes)
router.use('/subcategories', subCategoryRoutes)
router.use('/brands', brandRoutes)
router.use('/attributes', attributeRoutes)
router.use('/products', productRoutes)
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/reviews', reviewRoutes)
router.use('/coupons', couponRoutes)


module.exports = router;