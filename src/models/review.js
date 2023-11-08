const { DataTypes } = require('sequelize')

const db = require('../database/config/database')


const Review = db.define('Review', {
    id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey: true,
        defaultValue :DataTypes.UUIDV4,
    },
    productId : {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'product_id',
    },
    userId : {
        type : DataTypes.UUID,
        allowNull :true,
        field: 'user_id',
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ratings : {
        type : DataTypes.INTEGER,
        allowNull :false,
        values : [1,2,3,4,5],
    },
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'reviews',
    modelName: 'Review',
});

module.exports = Review
