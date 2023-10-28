const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Review = db.define('Review', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
    },
    productId : {
        type : DataTypes.UUID,
        allowNull :false
    },
    userId : {
        type : DataTypes.UUID,
        allowNull :false
    },
    content : {
        type : DataTypes.STRING,
    },
    ratings : {
        type : DataTypes.INTEGER,
        allowNull :false,
        values : [1,2,3,4,5],
    },
}, {
    tableName: 'reviews',
    timestamps : true, 
    paranoid: true,
})

Review.sync()
.then(() => {console.log(`Create reviews Table...`)}) 
.catch(error => console.error(error.message));

module.exports = Review;