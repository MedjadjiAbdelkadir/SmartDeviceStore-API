const SubCategory = require("../../models/subCategory")
const Category = require("../../models/category")
const Product = require("../../models/product")

/* -------------------- Beginning of Hooks -------------------- */

SubCategory.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['created_at','updated_at','deleted_at'],
    }
    options.include = [
        { 
            model: Category, 
            as: 'category' ,
            attributes: ['id','name', 'slug'], 
        },
        {
            model: Product,
            as: 'products', 
            // attributes: ['name'], 
        }

    ]
});

/* -------------------- End of Hooks -------------------- */