/*
    Beginning of relationships between tables
    table :  coupons && model : Coupon
*/

const Coupon = require("../../models/coupon")
const Brand = require("../../models/brand")
const Category = require("../../models/category")
const Product = require("../../models/product")
const SubCategory = require("../../models/subCategory")

Coupon.belongsTo(Product, { 
    as :'product-coupon', 
    foreignKey: 'target_id', 
    constraints: false ,
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
});
Coupon.belongsTo(Brand, {
    as :'brand-coupon', 
    foreignKey: 'target_id', 
    constraints: false ,
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
});
Coupon.belongsTo(Category, {
    as :'category-coupon',  
    foreignKey: 'target_id', 
    constraints: false ,
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
});
Coupon.belongsTo(SubCategory, {
    as :'subcategory-coupon', 
    foreignKey: 'target_id', 
    constraints: false ,
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
});

/* ---- End of relationships between tables ---- */