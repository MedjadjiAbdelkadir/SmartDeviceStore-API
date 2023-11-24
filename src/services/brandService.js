const { Op } = require('sequelize')

const { NotFoundError } = require('../utils/errors')

const Brand = require('../models/brand')

exports.getBrands = async ({ page , limit, sortBy, sortOrder, name, slug })=>{
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
        const data = await Brand.findAndCountAll(options)
        if(data.count === 0){
            throw new NotFoundError('There are no brands')
        }
        const response = {
            totalPages : Math.ceil(data.count/limit),
            totalItems :data.count ,
            brands : data.rows
        }
        return response
    } catch (error) {
        throw error
    }
}

exports.getBrand = async (id)=>{
    try {
        const brand =  await Brand.findByPk(id) 
        if(!brand){
            throw new NotFoundError(`Brand ${id} not found`)
        }
        return brand
    } catch (error) {
        throw error
    }
}

exports.createBrand = async (name, slug, image) =>{
    try {
        return await Brand.create({name, slug, image})
    } catch (error) {
        throw error;
    }
}

exports.updateBrand = async (id , name , slug , image) =>{
    try {
        const brand = await Brand.findByPk(id)
        if(!brand){
            throw new NotFoundError(`Brand ${id} not found`)
        }
        return await brand.update({name, slug , image})
    } catch (error) {
        throw error;
    }
}

exports.getUrlImageBrand = async (id)=>{
    try {
        const brandUrlImage = await Brand.findByPk(id,{
            attributes: ['image']
        })
        if(!brandUrlImage){
            throw new NotFoundError(`Brand ${id} not found`)
        }
        return brandUrlImage
    } catch (error) {
        throw error;
    }
}

exports.deleteBrand = async (id)=>{
    try {
        const brand = await Brand.findByPk(id)
        if(!brand){
            throw new NotFoundError(`Brand ${id} not found`)
        }
        return await brand.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreBrand = async (id) =>{
    try {
        const brand = await Brand.findByPk(id, { paranoid: false });
        if(brand && brand.deletedAt !== null){
            return await brand.restore()   
        }    
        throw new NotFoundError(`Brand ${id} not found`)
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteBrand = async (id) =>{
    try {
        const brand = await Brand.findByPk(id, { paranoid: false });
        if(brand && brand.deletedAt !== null){
            return await brand.destroy({force: true })   
        }    
        throw new NotFoundError(`Brand ${id} not found`)        
    } catch (error) {
        throw error;
    }
}

exports.allTrashBrands = async () =>{
    try {
        const brands = Brand.findAll({
            where: {
                deletedAt: { [Op.ne]: null }
            },
            paranoid: false
        })
        if(!brands){
            throw new NotFoundError('There are no brands in Trash')
        }
        return brands

    } catch (error) {
        throw error;
    }
}

