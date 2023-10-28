const Review = require("../../models/review");
const User = require("../../models/user");

/*
    Beginning of relationships between tables
    table :  users && model : User
*/

User.hasMany(Review , { as :'reviews',
    foreignKey:{
        name : 'userId',
    },
})

/* ---- End of relationships between tables ---- */
