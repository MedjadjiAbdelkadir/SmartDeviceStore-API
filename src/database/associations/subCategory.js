/*
    Beginning of relationships between tables
    table :  subcategories && model : SubCategory
*/

const SubCategory = require("../../models/subCategory")
const Category = require("../../models/category")
const Product = require("../../models/product")

SubCategory.belongsTo(Category, {
    as : 'category',
    foreignKey: 'category_id',
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
});

SubCategory.hasMany(Product , {
    as :'products',
    foreignKey:{
        name : 'sub_category_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

/* ---- End of relationships between tables ---- */