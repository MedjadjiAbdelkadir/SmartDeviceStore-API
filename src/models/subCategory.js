const { DataTypes } = require('sequelize')

const db = require('../database/config/database')

const SubCategory = db.define("SubCategory", {
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
    categoryId:{ 
        type : DataTypes.UUID,
        field: 'category_id',
    },

    image : {
        type : DataTypes.STRING,
        defaultValue :'sub-category-default-image.jpeg',
        get() {
            return `${process.env.BASE_URL}/uploads/subcategories/${this.getDataValue('image')}`
        },
    }
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'subcategories',
    modelName: 'SubCategory',
});

module.exports = SubCategory


