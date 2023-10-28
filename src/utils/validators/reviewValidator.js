const { check, body } = require('express-validator');

const validatorMiddleware= require('../../middlewares/validatorMiddleware');
const Review = require('../../models/review');
const User = require('../../models/user');
const Product = require('../../models/product');

exports.getReviewValidator = [
    check('id')
        .notEmpty().withMessage('Review id is Required')
        .isUUID().withMessage('Review id is Invalid'),
        
    validatorMiddleware,
];

exports.createReviewValidator = [

    body('userId')
        .notEmpty().withMessage('User Id is Required')
        .isUUID().withMessage('User Id Invalid Format')
        .custom(async(val)=>{
            await User.findByPk(val).then((user)=>{
                if(!user){
                    return Promise.reject(new Error('User id invalid'))
                }
            })
        }),

    body('productId')
        .notEmpty().withMessage('Product Id is Required')
        .custom(async(value)=>{
            await Product.findByPk(value).then((product)=>{
                if(!product){
                    return Promise.reject(new Error('Product id invalid'))
                }
            })
        })
        .custom(async(value, { req })=>{
            await Review.findOne({
                where : { productId : value , userId : req.body.userId}
            }).then((review)=>{
                if(review){
                    return Promise.reject(new Error('I have reviewed this product before'));
                }
            })
        }),

    body('content')
        .optional()
        .isString().withMessage('Review content is String')
        .trim()
        .isLength({ min: 4 }).withMessage('Too short Review content')
        .isLength({ max: 100 }).withMessage('Too long Review content'),

    body('ratings')
        .notEmpty().withMessage('Review ratings is Required')
        .isFloat({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5')

    ,
    validatorMiddleware,
];

exports.updateReviewValidator = [
    check('id').notEmpty().withMessage('Review id is Required')
        .isUUID().withMessage('Review id is Invalid'),

    body('userId')
        .optional()
        .custom((value)=>{
            User.findByPk(value).then((user)=>{
                if(!user) {
                    return Promise.reject(new Error('User id invalid'))
                }
            })
        }),

    body('productId')
        .optional()
        .custom(async(value, { req })=>{
            await Product.findByPk(value).then((product)=>{
                if(!product){
                    return Promise.reject(new Error('Product id invalid'))
                }
            })
        })
        .custom(async(value, { req })=>{
            await Review.findOne({
                where : { productId : value , userId : req.user.id}
            }).then((review)=>{
                if(review){
                    return Promise.reject(new Error('I have reviewed this product before'));
                }
            })
        }),

    body('content')
        .optional()
        .isString().withMessage('Review content is String')
        .trim()
        .isLength({ min: 4 }).withMessage('Too short Review content')
        .isLength({ max: 100 }).withMessage('Too long Review content'),

    body('ratings')
        .optional()
        .isFloat({ min: 1, max: 5 }).withMessage('Rating must be a number between 0 and 5')

    ,
    validatorMiddleware,
];

exports.deleteReviewValidator = [
    check('id').notEmpty().withMessage('Review id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.restoreReviewValidator = [
    check('id').notEmpty().withMessage('Review id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.forceDeleteReviewValidator = [
    check('id').notEmpty().withMessage('Review id is Required'),
    // Rules for validations 
    validatorMiddleware,
];