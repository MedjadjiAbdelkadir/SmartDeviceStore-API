const { check, body } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middleware/validatorMiddleware')

exports.getProductValidator = [
    check('id').notEmpty().withMessage('Product id is Required'),
    // .isUUID().withMessage('Product id is Invalid'),
    validatorMiddleware,
];

exports.createProductValidator = [
    // Rules for validations
    body('name').notEmpty().withMessage('Product name is Required')
    .isString().withMessage('Product name is String')
    .trim()
    .isLength({ min: 2 }).withMessage('Too short Product name')
    .isLength({ max: 40 }).withMessage('Too long Product name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })

    ,
    validatorMiddleware,
];

exports.updateProductValidator = [
    check('id')
        .notEmpty().withMessage('Product id is Required'),
        // .isUUID().withMessage('Product id is Invalid'),
        
    body('name').optional().trim()
    .isString().withMessage('Product name is String')
    .isLength({ min: 2 }).withMessage('Too short Product name')
    .isLength({ max: 40 }).withMessage('Too long Product name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })
    ,
    // Rules for validations 
    validatorMiddleware,
];

exports.deleteProductValidator = [
    check('id').notEmpty().withMessage('Product id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.restoreProductValidator = [
    check('id').notEmpty().withMessage('Product id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.forceDeleteProductValidator = [
    check('id').notEmpty().withMessage('Product id is Required'),
    // Rules for validations 
    validatorMiddleware,
];
