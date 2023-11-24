const { Op } = require('sequelize')
const { NotFoundError } = require('../utils/errors')

const Category = require('../models/category')

exports.getCategories = async ({ page , limit, sortBy, sortOrder, name, slug })=>{
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
        const data = await Category.findAndCountAll(options)
        if(data.count === 0){
            throw new NotFoundError('There are no Category')
        }
        const response = {
            totalPages : Math.ceil(data.count/limit),
            totalItems :data.count ,
            categories : data.rows
        }
        return response
    } catch (error) {
        throw error
    }
}

exports.getCategory = async (id)=>{
    try {
        const category =  await Category.findByPk(id) 
        if(!category){
            throw new NotFoundError(`Category ${id} not found`)
        }
        return category
    } catch (error) {
        throw error
    }
}

exports.createCategory = async (name, slug) =>{
    try {
        return await Category.create({name, slug})
    } catch (error) {
        throw error;
    }
}

exports.updateCategory = async (id , name , slug) =>{
    try {
        const category = await Category.findByPk(id)
        if(!category){
            throw new NotFoundError(`Category ${id} not found`)
        }
        return await category.update({name, slug})
    } catch (error) {
        throw error;
    }
}

exports.deleteCategory = async (id)=>{
    try {
        const category = await Category.findByPk(id)
        if(!category){
            throw new NotFoundError(`Category ${id} not found`)
        }
        return await category.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreCategory = async (id) =>{
    try {
        const category = await Category.findByPk(id, { paranoid: false });
        if(category && category.deletedAt !== null){
            return await category.restore()   
        }    
        throw new NotFoundError(`Category ${id} not found`)
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteCategory = async (id) =>{
    try {
        const category = await Category.findByPk(id, { paranoid: false });
        if(category && category.deletedAt !== null){
            return await category.destroy({force: true })   
        }    
        throw new NotFoundError(`Category ${id} not found`)        
    } catch (error) {
        throw error;
    }
}

exports.allTrashCategories = async () =>{
    try {
        const categories = Category.findAll({
            where: {
                deletedAt: { [Op.ne]: null }
            },
            paranoid: false
        })
        if(!categories){
            throw new NotFoundError('There are no category in Trash')
        }
        return categories

    } catch (error) {
        throw error;
    }
}

