const Category = require("../../models/category");
const Product = require("../../models/product");
const SubCategory = require("../../models/subCategory");

/*
    Beginning of relationships between tables
    table :  subcategories && model : SubCategory
*/

SubCategory.hasMany(Product , {
    as :'products',
    foreignKey:{
        name : 'subCategoryId',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

SubCategory.belongsTo(Category , { as :'category',
    foreignKey:{
        name : 'categoryId',
    },
})

/* ---- End of relationships between tables ---- */
