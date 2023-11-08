const Brand = require("../../models/brand")
const Product = require("../../models/product")

/* -------------------- Beginning of Hooks -------------------- */

Brand.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['created_at','updated_at','deleted_at'], 
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