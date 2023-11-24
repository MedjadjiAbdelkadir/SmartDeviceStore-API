const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getAttributeValidator = [
    check('id').notEmpty().withMessage('Attribute id is Required'),
    // .isUUID().withMessage('Attribute id is Invalid'),
    validatorMiddleware,
];

exports.createAttributeValidator = [
    // Rules for validations
    body('name').notEmpty().withMessage('Attribute name is Required')
    .isString().withMessage('Attribute name is String')
    .trim()
    .isLength({ min: 2 }).withMessage('Too short Attribute name')
    .isLength({ max: 40 }).withMessage('Too long Attribute name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })

    ,
    validatorMiddleware,
];

exports.updateAttributeValidator = [
    check('id')
        .notEmpty().withMessage('Attribute id is Required'),
        // .isUUID().withMessage('Attribute id is Invalid'),
        
    body('name').optional().trim()
    .isString().withMessage('Attribute name is String')
    .isLength({ min: 2 }).withMessage('Too short Attribute name')
    .isLength({ max: 40 }).withMessage('Too long Attribute name')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    })
    ,
    // Rules for validations 
    validatorMiddleware,
];

exports.deleteAttributeValidator = [
    check('id').notEmpty().withMessage('Attribute id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.restoreAttributeValidator = [
    check('id').notEmpty().withMessage('Attribute id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.forceDeleteAttributeValidator = [
    check('id').notEmpty().withMessage('Attribute id is Required'),
    // Rules for validations 
    validatorMiddleware,
];
