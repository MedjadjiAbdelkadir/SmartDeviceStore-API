const express = require('express')
const { 
    getCouponValidator, createCouponValidator, updateCouponValidator,deleteCouponValidator
} = require('../utils/validators/couponValidator')

const { 
    getCoupons, getCoupon ,createCoupon, updateCoupon, deleteCoupon
} = require('../controllers/couponController')

const { auth } = require('../middlewares/authenticateMiddleware')
const { allowedTo } = require('../middlewares/permissionsMiddleware')

const router = express.Router()
router.use(auth) 
router.use(allowedTo('admin', 'manager'))
router.get('/',getCoupons)
router.get('/:id', getCouponValidator ,  getCoupon)

// router.use()
router.post('/',createCouponValidator,
(req,res,next)=>{
    // const {userId, productId , content , ratings} = req.body
    // console.log("Middleware Auth :", req.user.dataValues);  
    // console.log("Req Body :", req.body.userId);  
    console.log("Req Body targetId :", req.body);  
    // next()
},createCoupon)
router.patch('/:id', updateCouponValidator, updateCoupon)
router.delete('/:id',deleteCouponValidator, deleteCoupon)

module.exports = router