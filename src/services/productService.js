const Product = require('../models/product');
const ProductAttribute = require('../models/productAttribute');
const Attribute = require('../models/attribute');

exports.getProducts = async () => {
    try {
        return await Product.findAll({
            order: [
                ['created_at', 'ASC'],
            ],
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
        const {name, slug, description, quantity, price, priceAfterDiscount,subCategoryId,brandId, fields} = data
        let productId
        await Product.create({
            name, slug, description, quantity, price, priceAfterDiscount,subCategoryId,brandId,
        }).then(async(product) => {
            productId = product.id 
            await Promise.all(
                fields.map(async (field) =>{
                    await ProductAttribute.create({
                        ProductId: productId,
                        AttributeId: field.attributeId,
                        value: field.value,
                    }).then(()=>{
                        console.log('Product and attribute values added.');
                    })
                })
            )

        }).then((product) => {

            console.log('Product has created',product);
        });

        // console.log('newProduct : ', newProduct);
             
        return await Product.findByPk(productId,{
            attributes : ['id' ,'name', 'slug', 'description', 'quantity', 'price', 'priceAfterDiscount'] ,
            include: [{
                model:Attribute, 
                as : 'features',
                attributes: ['id','name'], 
                through: {
                    as: 'values',
                    // as: '',
                    attributes: ['value'],
                }
            }]
        })
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