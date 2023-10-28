const Brand = require('../models/brand')

exports.getBrands = async () => {
    try {
        return await Brand.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
    } catch (error) {
        throw error;
    }
}

exports.getBrand = async ({id}) =>{
    try {
        return await Brand.findByPk(id)      
    } catch (error) {
        throw error;
    }
} 

exports.createBrand = async ({name, slug , image}) =>{
    try {
        return await Brand.create({name, slug, image})
    } catch (error) {
        throw error;
    }
} 

exports.updateBrand = async ({id , name , slug , image}) =>{
    try {
        const brand = await Brand.findByPk(id)
        if(!brand){
            return null
        }
        return await brand.update({name, slug , image})
    } catch (error) {
        throw error;
    }
}

exports.deleteBrand = async ({ id })=>{
    try {
        const brand = await Brand.findByPk(id)
        if(!brand){
            return null
        }
        return await brand.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreBrand = async ({ id }) =>{
    try {
        const brand = await Brand.findByPk(id,{ paranoid: false })
        if(!brand){
            return null
        }
        return await brand.restore()        
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteBrand = async ({ id }) =>{
    try {
        return Brand.destroy({ where: { id }, force: true })           
    } catch (error) {
        throw error;
    }
}