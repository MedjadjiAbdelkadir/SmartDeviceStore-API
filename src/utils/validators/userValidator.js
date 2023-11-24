const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const User = require('../../models/user');

exports.getProfileValidator = [
    check('id').notEmpty().withMessage('User id is Required'),
    // .isUUID().withMessage('Attribute id is Invalid'),
    validatorMiddleware,
];

exports.updateProfileValidator = [
    check('id')
        .notEmpty().withMessage('User id is Required'),
        // .isUUID().withMessage('Attribute id is Invalid'),
        
    body('firstName')
        .optional()
        .isString().withMessage('First Name is String')
        .trim()
        .isLength({ min: 4 }).withMessage('Too short First name')
        .isLength({ max: 40 }).withMessage('Too long First name'),

    body('lastName')
        .optional()
        .isString().withMessage('Last Name is String')
        .trim()
        .isLength({ min: 4 }).withMessage('Too short Last Name')
        .isLength({ max: 40 }).withMessage('Too long Last Name'),

    body('phone')
        .optional()
        .isMobilePhone('ar-DZ').withMessage('Invalid phone number')
        .trim()
        .custom(async (value, {req}) => {
            await User.findOne({
                where : { 
                    phone: value, 
                    id : !req.user.id.toString()
                }
            }).then((user) => {
                if (user) {
                return Promise.reject(new Error('Phone Number already in user'));
                }
            })
        })

    ,
    // Rules for validations 
    validatorMiddleware,
];

exports.updateProfileAvatarValidator = [
    check('id')
        .notEmpty().withMessage('User id is Required'),
        // .isUUID().withMessage('Attribute id is Invalid'),
        
    body('image')
        .notEmpty().withMessage('Profile avatar is Required')
    ,
    // Rules for validations 
    validatorMiddleware,
];

exports.deleteAccountValidator = [
    check('id').notEmpty().withMessage('Profile id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

exports.restoreAccountValidator = [
    check('id').notEmpty().withMessage('Profile id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

