/*
    Beginning of relationships between tables
    table :  attributes && model : Attribute
*/

const Attribute = require("../../models/attribute")
const ProductAttribute = require("../../models/productAttribute")
const Product = require("../../models/product")

Attribute.belongsToMany(Product, {
    through: ProductAttribute , 
    foreignKey:'attributeId'
});

/* ---- End of relationships between tables ---- */

