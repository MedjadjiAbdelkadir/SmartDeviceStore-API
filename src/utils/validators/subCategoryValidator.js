const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getSubCategoryValidator = [
    check('id').notEmpty().withMessage('SubCategory id is Required'),
    // .isUUID().withMessage('Category id is Invalid'),
    validatorMiddleware,
];

exports.createSubCategoryValidator = [
    // Rules for validations
    body('name').notEmpty().withMessage('SubCategory name is Required')
    .isString().withMessage('SubCategory name is String')
    .trim()
    .isLength({ min: 2 }).withMessage('Too short SubCategory name')
    .isLength({ max: 40 }).withMessage('Too long SubCategory name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })

    ,
    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('id')
        .notEmpty().withMessage('SubCategory id is Required'),
        // .isUUID().withMessage('Category id is Invalid'),
        
    body('name').optional().trim()
    .isString().withMessage('SubCategory name is String')
    .isLength({ min: 2 }).withMessage('Too short SubCategory name')
    .isLength({ max: 40 }).withMessage('Too long SubCategory name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })
    ,
    // Rules for validations 
    validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
    check('id').notEmpty().withMessage('SubCategory id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.restoreSubCategoryValidator = [
    check('id').notEmpty().withMessage('SubCategory id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.forceDeleteSubCategoryValidator = [
    check('id').notEmpty().withMessage('SubCategory id is Required'),
    // Rules for validations 
    validatorMiddleware,
];
