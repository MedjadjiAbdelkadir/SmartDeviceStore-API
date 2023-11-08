const Category = require("../../models/category")
const SubCategory = require("../../models/subCategory")

/* -------------------- Beginning of Hooks -------------------- */

Category.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['created_at','updated_at','deleted_at'],
    }
    options.include = [
        { 
            model: SubCategory, 
            as: 'subcategories' ,
            attributes: ['id','name', 'slug','image'], 
        }

    ]
});

/* -------------------- End of Hooks -------------------- */