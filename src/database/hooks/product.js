const Product = require("../../models/product")
const Attribute = require("../../models/attribute")
const Brand = require("../../models/brand")
const SubCategory = require("../../models/subCategory")


/* -------------------- Beginning of Hooks -------------------- */

Product.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['sub_category_id','brand_id','created_at','updated_at','deleted_at'], 
    }
    options.include = [
        {
            model: Brand,
            as: 'brand', 
            attributes: ['name', 'image'],  
        },{
            model: SubCategory,
            as: 'subcategory',  
            attributes: ['name'], 
        },{
            model:Attribute, 
            as : 'features',
            attributes: ['id','name'], 
            through: {
                as: 'values',
                attributes: ['value'],
            }
            // model: Attribute,
            // as : 'features',
            // through: { attributes: ['value'] },
        }
    ]

});
/* -------------------- End of Hooks -------------------- */