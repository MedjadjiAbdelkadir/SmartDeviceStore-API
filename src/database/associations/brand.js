/*
    Beginning of relationships between tables
    table :  brands && model : Brand
*/

const Brand = require("../../models/brand")
const Product = require("../../models/product")

Brand.hasMany(Product , {
    as :'products',
    foreignKey:{
        name : 'brand_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

/* ---- End of relationships between tables ---- */