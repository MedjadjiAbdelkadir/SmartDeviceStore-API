const Category = require("../../models/category");
const Product = require("../../models/product");
const SubCategory = require("../../models/subCategory");

/* -------------------- Beginning of Hooks -------------------- */


SubCategory.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['createdAt','updatedAt','deletedAt'], 
    };
    options.include = [
        {
            model: Category,
            as: 'category', 
            attributes: ['name'], 
        },
        {
            model: Product,
            as: 'products', 
            // attributes: ['name'], 
        },
    ]
});

/* -------------------- End of Hooks -------------------- */
