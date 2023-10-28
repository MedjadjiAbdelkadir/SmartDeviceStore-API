const Category = require("../../models/category");
const SubCategory = require("../../models/subCategory");

/*
    Beginning of relationships between tables
    table :  categories && model : Category
*/

Category.hasMany(SubCategory , {
    as :'subcategory',
    foreignKey:{
        name : 'categoryId',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

/* ---- End of relationships between tables ---- */