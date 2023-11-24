const { body } = require('express-validator');

const User = require('../../models/user');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.registerValidator = [

    body('firstName')
        .notEmpty().withMessage('First Name is Required')
        .isString().withMessage('First Name is String')
        .trim()
        .isLength({ min: 4 }).withMessage('Too short First name')
        .isLength({ max: 40 }).withMessage('Too long First name'),

    body('lastName')
        .notEmpty().withMessage('Last Name is Required')
        .isString().withMessage('Last Name is String')
        .trim()
        .isLength({ min: 4 }).withMessage('Too short Last Name')
        .isLength({ max: 40 }).withMessage('Too long Last Name'),

    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            await User.findOne({
                where : { email: value }
            }).then((user) => {
                if (user) {
                return Promise.reject(new Error('E-mail already in user'));
                }
            })
        }),

    body('phone')
        .notEmpty().withMessage('Phone is Required')
        .isMobilePhone('ar-DZ').withMessage('Invalid phone number')
        .trim()
        .custom(async (value) => {
            await User.findOne({
                where : { phone: value }
            }).then((user) => {
                if (user) {
                return Promise.reject(new Error('Phone Number already in user'));
                }
            })
        }),

    body('password')
        .notEmpty().withMessage('Password is Required')
        .trim()
        .isLength({ min: 8 }).withMessage('Too short Password')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
            throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),

    body('passwordConfirm')
        .notEmpty().withMessage('Password Confirmation Required'),

    validatorMiddleware,
];

exports.loginValidator = [
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Invalid email address')
        .trim(),

    body('password')
        .notEmpty().withMessage('Password is Required')
        .trim(),

    validatorMiddleware,
];

exports.forgotPasswordValidator = [
    body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Invalid email address')
    .trim(),

    validatorMiddleware,
]

exports.verifyResetCodeValidator = [
    body('resetCode')
    .notEmpty().withMessage('resetCode is Required')
    .trim(),
    validatorMiddleware,
]

exports.resetPasswordValidator = [
    body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Invalid email address')
    .trim(),

    body('password')
    .notEmpty().withMessage('Email is Required')
    .isLength({ min: 8 }).withMessage('Too short Password')
    .trim(),
    validatorMiddleware,
]