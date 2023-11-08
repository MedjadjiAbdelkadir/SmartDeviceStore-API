const { DataTypes } = require('sequelize')

const db = require('../database/config/database')

const Product = db.define('Product', {
    id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey: true,
        defaultValue :DataTypes.UUIDV4,
    },
    subCategoryId : {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'sub_category_id',
    },
    brandId : {
        type : DataTypes.UUID,
        allowNull :true,
        field: 'brand_id',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description : {
        type : DataTypes.TEXT,
        allowNull :false,
    },
    quantity : {
        type : DataTypes.INTEGER,
        allowNull :false,
        defaultValue : 1 ,
    },
    price : {
        type : DataTypes.INTEGER,
        allowNull :false,
    },
    priceAfterDiscount : {
        type : DataTypes.INTEGER,
        allowNull :false,
        field: 'price_after_discount',
    },
    averageRating : {
        type : DataTypes.DECIMAL,
        field: 'average_rating',
        // defaultValue : 0;
    },
    imageCover : {
        type : DataTypes.STRING,
        allowNull: false, 
        field: 'image_cover',
        get() {
            return `${process.env.BASE_URL}/uploads/products/${this.getDataValue('image')}`
        },
    },
    images : {
        type: DataTypes.ARRAY(DataTypes.STRING),
        get() {
            const images = this.getDataValue('images');
            return images.map(img => `${process.env.BASE_URL}/uploads/products/${img}`);
        },
    },
},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'products',
    modelName: 'Product',
});

module.exports = Product
