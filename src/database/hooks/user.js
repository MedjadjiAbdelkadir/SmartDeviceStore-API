const User = require("../../models/user")
const Product = require("../../models/product")

/* -------------------- Beginning of Hooks -------------------- */

User.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['created_at','updated_at','deleted_at'],
    }
    options.include = [
        {
            model: Product,
            as: 'products', 
            // attributes: ['name'], 
        }

    ]
});

/* -------------------- End of Hooks -------------------- */