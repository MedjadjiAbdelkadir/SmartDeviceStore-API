const Category = require("../../models/category");
const SubCategory = require("../../models/subCategory");

/* -------------------- Beginning of Hooks -------------------- */
Category.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['createdAt','updatedAt','deletedAt'], 
    }
    options.include = [
        {
            model: SubCategory,
            as: 'subcategory', 
            attributes: ['name'], 
        },
    ]
});
/* -------------------- End of Hooks -------------------- */
