const { DataTypes } = require('sequelize')

const db = require('../database/config/database')


const Category = db.define("Category", {
    id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey: true,
        defaultValue :DataTypes.UUIDV4,
    },
    name: {
        type : DataTypes.STRING,
        allowNull : false,
    },
    slug: {
        type : DataTypes.STRING,
        allowNull : false,
    },
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'categories',
    modelName: 'Category',
});

module.exports = Category


