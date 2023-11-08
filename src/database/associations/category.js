/*
    Beginning of relationships between tables
    table :  categories && model : Category
*/

const Category = require("../../models/category")
const Coupon = require("../../models/coupon")
const SubCategory = require("../../models/subCategory")

Category.hasMany(SubCategory, {
    as: 'subcategories',
    foreignKey: 'category_id',
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
});

Category.hasMany(Coupon , {
    as :'coupons',
    foreignKey:{
        name : 'target_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})
/* ---- End of relationships between tables ---- */