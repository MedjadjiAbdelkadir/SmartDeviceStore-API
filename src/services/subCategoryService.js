const { Op } = require('sequelize')
const { NotFoundError } = require('../utils/errors')

const SubCategory = require('../models/subCategory')

exports.getSubCategories = async ({ page , limit, sortBy, sortOrder, name, slug })=>{
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
        const data = await SubCategory.findAndCountAll(options)
        if(data.count === 0){
            throw new NotFoundError('There are no SubCategory')
        }
        const response = {
            totalPages : Math.ceil(data.count/limit),
            totalItems :data.count ,
            subcategories : data.rows
        }
        return response
    } catch (error) {
        throw error
    }
}

exports.getSubCategory = async (id)=>{
    try {
        const subCategory =  await SubCategory.findByPk(id) 
        if(!subCategory){
            throw new NotFoundError(`SubCategory ${id} not found`)
        }
        return subCategory
    } catch (error) {
        throw error
    }
}

exports.createSubCategory = async (categoryId, name, slug) =>{
    try {
        return await SubCategory.create({categoryId, name, slug})
    } catch (error) {
        throw error;
    }
}

exports.updateSubCategory = async (id ,categoryId, name , slug) =>{
    try {
        const subCategory = await SubCategory.findByPk(id)
        if(!subCategory){
            throw new NotFoundError(`SubCategory ${id} not found`)
        }
        return await subCategory.update({name, categoryId, slug})
    } catch (error) {
        throw error;
    }
}

exports.deleteSubCategory = async (id)=>{
    try {
        const subCategory = await SubCategory.findByPk(id)
        if(!subCategory){
            throw new NotFoundError(`SubCategory ${id} not found`)
        }
        return await subCategory.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreSubCategory = async (id) =>{
    try {
        const subCategory = await SubCategory.findByPk(id, { paranoid: false });
        if(subCategory && subCategory.deletedAt !== null){
            return await subCategory.restore()   
        }    
        throw new NotFoundError(`SubCategory ${id} not found`)
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteSubCategory = async (id) =>{
    try {
        const subCategory = await SubCategory.findByPk(id, { paranoid: false });
        if(subCategory && subCategory.deletedAt !== null){
            return await subCategory.destroy({force: true })   
        }    
        throw new NotFoundError(`SubCategory ${id} not found`)        
    } catch (error) {
        throw error;
    }
}

exports.allTrashSubCategories = async () =>{
    try {
        const subCategories = SubCategory.findAll({
            where: {
                deletedAt: { [Op.ne]: null }
            },
            paranoid: false
        })
        if(!subCategories){
            throw new NotFoundError('There are no sub category in Trash')
        }
        return subCategories

    } catch (error) {
        throw error;
    }
}

