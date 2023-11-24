const express = require('express')

const { getReviews, getReview, updateReview, deleteReview, createReview, allTrashReviews, restoreReview, forceDeleteReview } = require('../controllers/reviewController')
const { getReviewValidator, createReviewValidator, updateReviewValidator, deleteReviewValidator, restoreReviewValidator, forceDeleteReviewValidator } = require('../utils/validators/reviewValidator')
const { allowedTo } = require('../middleware/permissionsMiddleware')
const { auth } = require('../middleware/authMiddleware')


const router = express.Router()

router.get('/' , getReviews)
router.get('/trash',allowedTo('admin'), allTrashReviews)
router.get('/:id' ,getReviewValidator, getReview)
router.use(auth)
router.use(allowedTo('admin'))
router.post('/',createReviewValidator, createReview)
router.patch('/:id',  updateReviewValidator ,updateReview)
router.delete('/:id', deleteReviewValidator, deleteReview)


router.patch('/restore/:id', restoreReviewValidator , restoreReview)
router.delete('/force-delete/:id', forceDeleteReviewValidator ,forceDeleteReview)
// trash
module.exports = router