const {DataTypes} = require('sequelize');
const db = require('../config/database');

const ProductAttribute = db.define('ProductAttribute', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
    },
    ProductId : {
        type : DataTypes.UUID,
        allowNull :false,
        unique :false,
    },
    AttributeId : {
        type : DataTypes.UUID,
        allowNull :false,
        unique :false,
    },
    value : {
        type : DataTypes.STRING,
        allowNull :false,
        unique :false,
        validate: {
            notNull : true,
        }
    },

}, {
    tableName: 'products_attributes',
    timestamps : true, 
    paranoid: true,
})

ProductAttribute.sync({alter : true})
.then(() => console.log(`Create products_attributes Table...`)) 
.catch(error => console.log(error.message));

module.exports = ProductAttribute;