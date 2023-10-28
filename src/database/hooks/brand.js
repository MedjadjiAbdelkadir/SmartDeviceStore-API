const Brand = require("../../models/brand");
const Product = require("../../models/product");
/* -------------------- Beginning of Hooks -------------------- */

Brand.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['createdAt','updatedAt','deletedAt'], 
    }
    options.include = [
        {
            model: Product,
            as: 'products', 
            // attributes: ['name'], 
        },
    ]

});
/* -------------------- End of Hooks -------------------- */
