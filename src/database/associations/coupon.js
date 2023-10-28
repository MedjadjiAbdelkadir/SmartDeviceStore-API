const Product = require("../../models/product");
const Coupon = require("../../models/coupon");
const Category = require("../../models/category");
const SubCategory = require("../../models/subCategory");
const Brand = require("../../models/brand");

/*
    Beginning of relationships between tables
    table :  coupons && model : Coupon
*/

Coupon.belongsTo(Category, { as :'category-coupon',
    foreignKey:{
        name : 'targetId',
    },
})

Coupon.belongsTo(SubCategory, { as :'subcategory-coupon',
    foreignKey:{
        name : 'targetId',
    },
})

Coupon.belongsTo(Product, { as :'product-coupon',
    foreignKey:{
        name : 'targetId',
    },
})

Coupon.belongsTo(Brand, { as :'brand-coupon',
    foreignKey:{
        name : 'targetId',
    },
})

/* ---- End of relationships between tables ---- */