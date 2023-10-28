const express = require('express')

const { 
    getReviewValidator, createReviewValidator, updateReviewValidator,
    deleteReviewValidator, restoreReviewValidator, forceDeleteReviewValidator 
} = require('../utils/validators/reviewValidator')

const { 
    getReviews, getReview, setProductIDAndUserIdToBody, createReview, updateReview, 
    deleteReview, restoreReview, forceDeleteReview 
} = require('../controllers/reviewController')

const { auth } = require('../middlewares/authenticateMiddleware')
const { allowedTo } = require('../middlewares/permissionsMiddleware')

const router = express.Router()
router.get('/',getReviews)
router.get('/:id', getReviewValidator ,  getReview)
router.use(auth) 
// router.use()
router.post('/', allowedTo('user'), setProductIDAndUserIdToBody ,
(req,res,next)=>{
    // const {userId, productId , content , ratings} = req.body
    // console.log("Middleware Auth :", req.user.dataValues);  
    // console.log("Req Body :", req.body.userId);  
    // console.log("Req Body :", req.body);  
    next()
},createReviewValidator,createReview)
router.patch('/:id', updateReviewValidator, updateReview)
router.delete('/:id',allowedTo('user'), deleteReviewValidator, deleteReview)

router.patch('/restore/:id', restoreReviewValidator , restoreReview )
router.delete('/force/:id', forceDeleteReviewValidator ,forceDeleteReview)

module.exports = router