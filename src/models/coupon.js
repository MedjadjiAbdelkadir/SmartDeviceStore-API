const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Coupon = db.define('Coupon', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
    },
    type : {
        type : DataTypes.ENUM,
        values : ['store','first_time_shopper','free_shipping','category', 'subcategory', 'product', 'brand','seasonal', 'special_occasion'],
        allowNull :false,
        defaultValue : 'product'
    },
    targetId : {
        type : DataTypes.UUID,
        allowNull :false
    },
    code : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    startAt: {
        type: DataTypes.DATE,
        allowNull: false,        
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,        
    },
    display : {
        type: DataTypes.BOOLEAN,
        defaultValue : false,
    },
    createdBy : {
        type : DataTypes.UUID,
        allowNull :false
    },
}, {
    tableName: 'coupons',
    timestamps : true, 
    paranoid: true,
})

Coupon.sync()
.then(() => {console.log(`Create coupons Table...`)}) 
.catch(error => console.error(error.message));

module.exports = Coupon;