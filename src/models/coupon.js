const { DataTypes } = require('sequelize')

const db = require('../database/config/database')


const Coupon = db.define('Coupon', {
    id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey: true,
        defaultValue :DataTypes.UUIDV4,
    },
    type : {
        type : DataTypes.ENUM,
        values : ['store','first_time_shopper','free_shipping','category', 'subcategory', 'product', 'brand','seasonal', 'special_occasion'],
        allowNull :false,
        defaultValue : 'store'
    },
    targetId : {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'target_id',     
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
        field: 'start_at',       
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false, 
        field: 'expires_at',       
    },
    display : {
        type: DataTypes.BOOLEAN,
        defaultValue : false,
    },
    createdBy : {
        type : DataTypes.UUID,
        allowNull :false,
        field: 'created_by',
    },
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'coupons',
    modelName: 'Coupon',
});

module.exports = Coupon
