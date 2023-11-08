const { DataTypes } = require('sequelize')

const db = require('../database/config/database')

const ProductAttribute = db.define('ProductAttribute', {
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
    attributeId : {
        type : DataTypes.UUID,
        allowNull :true,
        field: 'attribute_id',
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'products_attributes',
    modelName: 'ProductAttribute',
});

module.exports = ProductAttribute