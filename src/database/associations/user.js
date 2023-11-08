/*
    Beginning of relationships between tables
    table :  users && model : User
*/

const Review = require("../../models/review")
const User = require("../../models/user")

User.hasMany(Review , { as :'reviews',
    foreignKey:{
        name : 'user_id',
    },
    onDelete: 'CASCADE' , onUpdate: 'CASCADE'
})

/* ---- End of relationships between tables ---- */