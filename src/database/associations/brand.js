const Brand = require("../../models/brand");
const Product = require("../../models/product");

/*
    Beginning of relationships between tables
    table :  brands && model : Brand
*/
Brand.hasMany(Product , {
    as :'products',
    foreignKey:{
        name : 'brandId',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

/* ---- End of relationships between tables ---- */