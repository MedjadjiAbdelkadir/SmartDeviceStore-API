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
            return `${process.env.BASE_URL}/uploads/brands/${this.getDataValue('image')}`
        },
    }
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'brands',
    modelName: 'Brand',
});

module.exports = Brand
