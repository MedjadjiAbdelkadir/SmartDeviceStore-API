const Product = require("../../models/product");
const Review = require("../../models/review");

const Attribute = require("../../models/attribute");

const Brand = require("../../models/brand");

const ProductAttribute = require("../../models/productAttribute");

const SubCategory = require("../../models/subCategory");

/*
    Beginning of relationships between tables
    table :  products && model : Product
*/

Product.hasMany(Review , { as :'reviews',
    foreignKey:{
        name : 'productId',
    },
})

Product.belongsTo(SubCategory , {
    as : 'subcategory',
    foreignKey:{
        name : 'subCategoryId',
    },
})

Product.belongsTo(Brand , {
    as :'brand',
    foreignKey:{
        name : 'brandId',
    },
})

Product.belongsToMany(Attribute, { through: ProductAttribute,as: 'features' });
Product.belongsToMany(ProductAttribute, {through: ProductAttribute,as: 'values' });
/* ---- End of relationships between tables ---- */