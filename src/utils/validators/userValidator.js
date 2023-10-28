const { check, body } = require('express-validator');

const validatorMiddleware= require('../../middlewares/validatorMiddleware');
const User = require('../../models/user');

exports.getUserValidator = [
    check('id').notEmpty().withMessage('Brand id is Required')
    .isNumeric().withMessage('Brand id is Number')
    ,
    validatorMiddleware,
];

exports.updateUserValidator = [
    check('id').notEmpty().withMessage('Brand id is Required')
        .custom((val, { req })=>{
            User.findByPk(val).then((user)=>{
                if(!user){
                    return Promise.reject(new Error('This is not a valid'));
                }
                if(user.id.toString() !== req.user.id.toString()){
                    return Promise.reject(
                        new Error(`Your are not allowed to perform this action`)
                    );
                }
            })
        }),

    body('firstName')
        .optional()
        .isString().withMessage('First Name is String')
        .trim()
        .isLength({ min: 5 }).withMessage('Too short First name')
        .isLength({ max: 40 }).withMessage('Too long First name'),

    body('lastName')
        .optional()
        .isString().withMessage('Last Name is String')
        .trim()
        .isLength({ min: 5 }).withMessage('Too short Last Name')
        .isLength({ max: 40 }).withMessage('Too long Last Name')
    ,
    body('phone')
        .optional()
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

    // Rules for validations 
    validatorMiddleware,
];

