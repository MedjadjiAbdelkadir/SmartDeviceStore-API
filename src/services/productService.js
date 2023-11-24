const { Op } = require('sequelize')
const { NotFoundError } = require('../utils/errors')

const Product = require('../models/product');
const ProductAttribute = require('../models/productAttribute');

exports.getProducts = async ({ page , limit, sortBy, sortOrder, name, slug })=>{
    try {
        const whereCondition = {};
        if (name) whereCondition.name = { [Op.iLike]: `%${name}%` }
        if (slug) whereCondition.slug = { [Op.iLike]: `%${slug}%` }

        const order = sortBy ? [[sortBy, sortOrder || 'ASC']] : [['created_at', 'DESC']]
        const options = {
            limit: limit,
            offset: (page - 1) * limit || 0,
            where: whereCondition,
            order,
        };
        const data = await Product.findAndCountAll(options)
        if(data.count === 0){
            throw new NotFoundError('There are no Products')
        }
        const response = {
            totalPages : Math.ceil(data.count/limit),
            totalItems :data.count ,
            products : data.rows
        }
        return response
    } catch (error) {
        throw error
    }
}

exports.getProduct = async (id)=>{
    try {
        const product =  await Product.findByPk(id) 
        if(!product){
            throw new NotFoundError(`Product ${id} not found`)
        }
        return product
    } catch (error) {
        throw error
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
        }).catch(err=>{
            throw err;
        })
    } catch (error) {
        throw error;
    }
}

exports.updateProduct = async (id,data) =>{
    try {
        // Logic for updating a product 
    } catch (error) {
        throw error;
    }
}

exports.deleteProduct = async (id)=>{
    try {
        const product = await Product.findByPk(id)
        if(!product){
            throw new NotFoundError(`Product ${id} not found`)
        }
        return await product.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreProduct = async (id) =>{
    try {
        const product = await Product.findByPk(id, { paranoid: false });
        if(product && product.deletedAt !== null){
            return await product.restore()   
        }    
        throw new NotFoundError(`Product ${id} not found`)
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteProduct = async (id) =>{
    try {
        const product = await Product.findByPk(id, { paranoid: false });
        if(product && product.deletedAt !== null){
            return await product.destroy({force: true })   
        }    
        throw new NotFoundError(`Product ${id} not found`)        
    } catch (error) {
        throw error;
    }
}

exports.allTrashProducts = async () =>{
    try {
        const products = Product.findAll({
            where: {
                deletedAt: { [Op.ne]: null }
            },
            paranoid: false
        })
        if(!products){
            throw new NotFoundError('There are no products in Trash')
        }
        return products

    } catch (error) {
        throw error;
    }
}