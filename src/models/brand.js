const { DataTypes } = require('sequelize')

const db = require('../database/config/database')

const Brand = db.define('Brand', {
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
    image : {
        type : DataTypes.STRING,
        defaultValue :'brand-default-image.jpeg',
        get() {
            // return `uploads/brands/${this.getDataValue('image')}`
            return `${process.env.BASE_URL}/uploads/brands/${this.getDataValue('image')}`
        },
    },
    createdAt:{
        type : DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt : {
        field: 'updated_at',
        type : DataTypes.DATE,
    },
    deletedAt : {
        field: 'deleted_at',
        type : DataTypes.DATE,
    }
},{
    timestamps: true, 
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'brands',
    modelName: 'Brand',
});

module.exports = Brand
