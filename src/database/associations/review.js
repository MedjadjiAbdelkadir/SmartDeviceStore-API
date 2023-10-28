const Review = require("../../models/review");
const Product = require("../../models/product");
const User = require("../../models/user");

/*
    Beginning of relationships between tables
    table :  reviews && model : Review
*/

Review.belongsTo(Product , { as :'products',
    foreignKey:{
        name : 'productId',
    },
})

Review.belongsTo(User , { as :'users',
    foreignKey:{
        name : 'userId',
    },
})

/* ---- End of relationships between tables ---- */