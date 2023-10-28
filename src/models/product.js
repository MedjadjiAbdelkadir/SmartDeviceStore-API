const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Product = db.define('Product', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
    },
    subCategoryId : {
        type : DataTypes.UUID,
        allowNull :false,
    },
    brandId : {
        type : DataTypes.UUID,
        allowNull :true
    },
    name : {
        type : DataTypes.STRING,
        allowNull :false,
        validate: {
            notNull : true,
            min:5,
            max:6,
        }
    },
    slug :{
        type : DataTypes.STRING,
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
    },
    averageRating : {
        type : DataTypes.DECIMAL,
        // defaultValue : 0;
    }
    // imageCover : {
    //     type : DataTypes.STRING,
    //     allowNull: false, 
    //     get() {
    //         return `${process.env.BASE_URL}/uploads/products/${this.getDataValue('image')}`
    //     },
    // },
    // images : {
    //     // type : DataTypes.JSON,
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     get() {
    //         const images = this.getDataValue('images');
    //         return images.map(img => `${process.env.BASE_URL}/uploads/products/${img}`);
    //     },
    // },
}, {
    tableName: 'products',
    timestamps : true, 
    paranoid: true,
})

Product.sync({alter : true})
.then(() => console.log(`Create products Table...`)) 
.catch(error => console.log(error.message));

module.exports = Product;