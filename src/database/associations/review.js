/*
    Beginning of relationships between tables
    table :  reviews && model : Review
*/

const Review = require("../../models/review")
const Product = require("../../models/product")
const User = require("../../models/user")

Review.belongsTo(Product , { as :'products',
    foreignKey:{
        name : 'product_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

Review.belongsTo(User , { as :'users',
    foreignKey:{
        name : 'user_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})
        


/* ---- End of relationships between tables ---- */