const Product = require('../models/product');
const ProductAttribute = require('../models/productAttribute');
const Attribute = require('../models/attribute');

exports.getProducts = async () => {
    try {
        return await Product.findAll({
            attributes : ['id' ,'name', 'slug', 'description', 'quantity', 'price', 'priceAfterDiscount'] ,
            order: [
                ['createdAt', 'ASC'],
            ],
            include: [{
                model:Attribute, 
                as : 'features',
                attributes: ['id','name'], 
                through: {
                    as: 'values',
                    attributes: ['value'], // Include the 'value' attribute from the junction table
                }
            }]
        })
    } catch (error) {
        throw error;
    }
}

exports.getProduct = async ({id}) =>{
    try {
        return await Product.findByPk(id)      
    } catch (error) {
        throw error;
    }
} 

exports.createProduct = async (data) =>{
    try {
        const {name, slug, description, quantity, price, priceAfterDiscount,fields} = data
        
        const product =  await Product.create({
            name, slug, description, quantity, price, priceAfterDiscount
        })
        if (fields && fields.length > 0){
            let features;
            await Promise.all(
                fields.map(async(field) =>{
                    // eslint-disable-next-line no-unused-vars
                    features = await ProductAttribute.create({
                        AttributeId : field.attributeId,
                        ProductId: product.id,
                        value    : field.value
                    })
                    // return features;
                    // console.log(`attributeId : ${field.attributeId} and value : ${field.value}`);
                })
            )
            return await Product.findByPk(product.id,{
                // 'description', 'quantity',
                attributes : ['id' ,'name', 'slug',  'price', 'priceAfterDiscount'] ,
                include: [{
                    model:Attribute, 
                    as : 'features',
                    attributes: ['id','name'], 
                    through: {
                        as: 'values',
                        attributes: ['value'], // Include the 'value' attribute from the junction table
                    }
                }]
            })
        }
    } catch (error) {
        throw error;
    }
} 

exports.updateProduct = async ({id , data}) =>{
    try {
        const {name, slug, description, quantity, price, priceAfterDiscount,fields} = data
        const product = await Product.findByPk(id)
        if(!product){
            return null
        }
        await product.update({
            name, slug, description, quantity, price, priceAfterDiscount
        })
    } catch (error) {
        throw error;
    }
}

exports.deleteProduct = async ({ id })=>{
    try {
        const product = await Product.findByPk(id)
        if(!product){
            return null
        }
        return await product.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreProduct = async ({ id }) =>{
    try {
        const product = await Product.findByPk(id,{ paranoid: false })
        if(!product){
            return null
        }
        return await product.restore()        
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteProduct = async ({ id }) =>{
    try {
        return Product.destroy({ where: { id }, force: true })           
    } catch (error) {
        throw error;
    }
}