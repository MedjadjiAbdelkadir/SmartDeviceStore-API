const { check, body } = require('express-validator');

const validatorMiddleware= require('../../middlewares/validatorMiddleware');

const Brand = require('../../models/brand');
const Product = require('../../models/product');
const Category = require('../../models/category');
const SubCategory = require('../../models/subCategory');
const User = require('../../models/user');

exports.getCouponValidator = [
    check('id')
        .notEmpty().withMessage('Coupon id is Required')
        .isUUID().withMessage('Coupon id is Invalid'),
        
    validatorMiddleware,
];

exports.createCouponValidator = [

    // {createdBy,type, targetId, code, discount, startAt,expiresAt}

    body('code')
        .notEmpty().withMessage('Code of coupon is Required') 
        .isString().withMessage('Review content is String')
        .trim()
        .isLength({ min: 10 , max: 10 }).withMessage('Code must be 10 character long'),

    body('startAt')
        .notEmpty().withMessage('Coupon Start day is Required') 
        .custom((value) => {
            if (!/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\+\d{2})$/.test(value)) {
                return Promise.reject(new Error('Invalid Coupon Start date and time format YYYY-MM-DD HH:mm:ss.sss+hh'))
            }
            return true;
        }),
        // 2023-10-24 14:38:54.832+01
    body('expiresAt')
        .notEmpty().withMessage('Coupon expires is Required') 
        .custom((value) => {
            if (!/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\+\d{2})$/.test(value)) {
                return Promise.reject(new Error('Invalid Coupon expires date and time format YYYY-MM-DD HH:mm:ss.sss+hh'))
            }
            return true;
        }),
    
    body('discount')
    .notEmpty().withMessage('Coupon discount is Required')
    .isFloat({ min: 1, max: 1000 }).withMessage('Discount must be a number between 1 and 1000'),

    body('type')
    .notEmpty().withMessage('Coupon type is Required')
    .isString().withMessage('Coupon type must be a string')
    .custom((value, {req})=>{
        const types = ['store','first_time_shopper','free_shipping','category', 'subcategory', 'product', 'brand','seasonal', 'special_occasion'];
        if(!types.includes(value.toString())){
            return Promise.reject(new Error('Coupon type invalid'))
        }
        if(!['category', 'subcategory', 'product', 'brand'].includes(value.toString())){
            req.body.targetId = ''
        }
        return true
    }),

    body('targetId')
    // .notEmpty().withMessage('Coupon type id  is Required')    
    .custom(async(targetId, {req})=>{
        if(!['category', 'subcategory', 'product', 'brand'].includes(req.body.type.toString()) && targetId == null){
            return Promise.reject(new Error(`${req.body.type} id  is Required`))
        }
        
        if(req.body.type.toString() === 'brand'){
            await Brand.findByPk(targetId).then((brand)=>{
                if(!brand){
                    return Promise.reject(new Error('Coupon type id invalid'))
                }
            })
        }else if(req.body.type.toString() === 'category'){
            await Category.findByPk(targetId).then((category)=>{
                if(!category){
                    return Promise.reject(new Error('Coupon type id invalid'))
                }
            })
        }else if(req.body.type.toString() === 'subcategory'){
            await SubCategory.findByPk(targetId).then((subcategory)=>{
                if(!subcategory){
                    return Promise.reject(new Error('Coupon type id invalid'))
                }
            })
        }else if(req.body.type.toString() === 'product'){
            await Product.findByPk(targetId).then((product)=>{
                if(!product){
                    return Promise.reject(new Error('Coupon type id invalid'))
                }
            })
        }        

    }),









    validatorMiddleware,
];

exports.updateCouponValidator = [
    check('id')
        .notEmpty().withMessage('Coupon id is Required')
        .isUUID().withMessage('Coupon id is Invalid'),
   
    validatorMiddleware,
];

exports.deleteCouponValidator = [
    check('id').notEmpty().withMessage('Coupon id is Required'),
    // Rules for validations 
    validatorMiddleware,
];

