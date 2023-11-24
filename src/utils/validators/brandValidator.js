const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getBrandValidator = [
    check('id').notEmpty().withMessage('Brand id is Required'),
    // .isUUID().withMessage('Brand id is Invalid'),
    validatorMiddleware,
];

exports.createBrandValidator = [
    // Rules for validations
    body('name').notEmpty().withMessage('Brand name is Required')
    .isString().withMessage('Brand name is String')
    .trim()
    .isLength({ min: 2 }).withMessage('Too short brand name')
    .isLength({ max: 40 }).withMessage('Too long brand name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    }),
    body('image').notEmpty().withMessage('Brand image is Required')

    ,
    validatorMiddleware,
];

exports.updateBrandValidator = [
    check('id')
        .notEmpty().withMessage('Brand id is Required'),
        // .isUUID().withMessage('Brand id is Invalid'),
        
    body('name').optional().trim()
    .isString().withMessage('Brand name is String')
    .isLength({ min: 2 }).withMessage('Too short brand name')
    .isLength({ max: 40 }).withMessage('Too long brand name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })
    ,
    // Rules for validations 
    validatorMiddleware,
];

exports.deleteBrandValidator = [
    check('id').notEmpty().withMessage('Brand id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.restoreBrandValidator = [
    check('id').notEmpty().withMessage('Brand id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.forceDeleteBrandValidator = [
    check('id').notEmpty().withMessage('Brand id is Required'),
    // Rules for validations 
    validatorMiddleware,
];
