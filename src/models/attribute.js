const { DataTypes } = require('sequelize')

const db = require('../database/config/database')

const Attribute = db.define('Attribute', {
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
    },
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'attributes',
    modelName: 'Attribute',
});

module.exports = Attribute


