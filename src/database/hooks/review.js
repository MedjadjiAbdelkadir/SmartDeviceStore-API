const Review = require("../../models/review")
const Product = require("../../models/product")
const User = require("../../models/user")

/* -------------------- Beginning of Hooks -------------------- */

Review.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['user_id','created_at','updated_at','deleted_at'], 
    }
    options.include = [
        {
            model: Product,
            as: 'products', 
            attributes: ['id','name'], 
        },
        {
            model: User,
            as: 'users', 
            attributes: ['last_name','first_name','profile_picture'], 
        },
    ]

});
/* -------------------- End of Hooks -------------------- */