/*
    Beginning of relationships between tables
    table :  products && model : Product
*/

const Product = require("../../models/product")
const Attribute = require("../../models/attribute")
const Brand = require("../../models/brand")
const ProductAttribute = require("../../models/productAttribute")
const SubCategory = require("../../models/subCategory")
const User = require("../../models/user")

Product.belongsTo(Brand , {
    as :'brand',
    foreignKey:{
        name : 'brand_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

Product.belongsTo(SubCategory , {
    as : 'subcategory',
    foreignKey:{
        name : 'sub_category_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

Product.belongsToMany(Attribute, { 
    through: ProductAttribute,
    foreignKey:{
        name : 'attribute_id',
    },
    as: 'features' 
});

Product.belongsTo(User , {
    as :'vendor',
    foreignKey:{
        name : 'vendor_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

// Product.belongsToMany(Attribute, { 
//     through: ProductAttribute,
//     as: 'features',
//     foreignKey : 'attributeId' ,
//     onDelete: 'CASCADE' , onUpdate: 'CASCADE' 
// });

/* ---- End of relationships between tables ---- */