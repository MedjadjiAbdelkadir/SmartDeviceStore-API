const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getCategoryValidator = [
    check('id').notEmpty().withMessage('Category id is Required'),
    // .isUUID().withMessage('Category id is Invalid'),
    validatorMiddleware,
];

exports.createCategoryValidator = [
    // Rules for validations
    body('name').notEmpty().withMessage('Category name is Required')
    .isString().withMessage('Category name is String')
    .trim()
    .isLength({ min: 2 }).withMessage('Too short Category name')
    .isLength({ max: 40 }).withMessage('Too long Category name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })

    ,
    validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('id')
        .notEmpty().withMessage('Category id is Required'),
        // .isUUID().withMessage('Category id is Invalid'),
        
    body('name').optional().trim()
    .isString().withMessage('Category name is String')
    .isLength({ min: 2 }).withMessage('Too short Category name')
    .isLength({ max: 40 }).withMessage('Too long Category name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })
    ,
    // Rules for validations 
    validatorMiddleware,
];

exports.deleteCategoryValidator = [
    check('id').notEmpty().withMessage('Category id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.restoreCategoryValidator = [
    check('id').notEmpty().withMessage('Category id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.forceDeleteCategoryValidator = [
    check('id').notEmpty().withMessage('Category id is Required'),
    // Rules for validations 
    validatorMiddleware,
];
