/*
    Beginning of relationships between tables
    table :  users && model : User
*/

const Product = require("../../models/product");
const Review = require("../../models/review")
const User = require("../../models/user")

User.hasMany(Review , { as :'reviews',
    foreignKey:{
        name : 'user_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

User.hasMany(Product, {
    as: 'products',
    foreignKey: 'vendor_id',
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
});

/* ---- End of relationships between tables ---- */