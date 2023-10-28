const Attribute = require("../../models/attribute");
const Brand = require("../../models/brand");
const Product = require("../../models/product");
const Review = require("../../models/review");
const SubCategory = require("../../models/subCategory");
const User = require("../../models/user");

/* -------------------- Beginning of Hooks -------------------- */


Product.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['subCategoryId','brandId','createdAt','updatedAt','deletedAt'], 
        // attributes : ['id' ,'name', 'slug', 'description', 'quantity', 'price', 'priceAfterDiscount'] ,

    }
    options.include = [
        {
            model: Brand,
            as: 'brand', 
            attributes: ['name', 'image'], 
        },
        {
            model: SubCategory,
            as: 'subcategory',  
            attributes: ['name'], 
        },
        {
            model:Attribute, 
            as : 'features',
            attributes: ['id','name'], 
            through: {
                as: 'values',
                attributes: ['value'],
            }
        },
        {
            model: Review,
            as: 'reviews', 
            attributes: ['id','userId','content','ratings'], 
            // include: 
            include: {
                model: User,
                as : 'users',
                attributes : ['id','firstName','lastName','profilePicture']
            },
        },
    ]
})



/* -------------------- End of Hooks -------------------- */
