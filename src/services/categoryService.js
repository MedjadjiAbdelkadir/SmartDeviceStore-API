const Category = require('../models/category')

exports.getCategories = async () =>{
    try {
        return await Category.findAll({
            order: [
                ['createdAt', 'ASC']
            ],
        })
    } catch (error) {
        throw error;
    }
} 

exports.getCategory = async ({id}) => {
    try {
        return await Category.findByPk(id)
    } catch (error) {
        throw error
    }
} 

exports.createCategory = async ({name, slug, image}) =>{
    try {
        return await Category.create({name, slug, image})
    } catch (error) {
        throw error;
    }
}

exports.updateCategory = async ({id, name, slug, image}) =>{
    try {
        const category = await Category.findByPk(id)
        if(!category){
            return null
        }
        return await category.update({name, slug, image})
    } catch (error) {
        throw error;
    }
}

exports.deleteCategory = async ({ id })=>{
    try {
        const category = await Category.findByPk(id)
        if(!category){
            return null
        }
        return await category.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreCategory = async ({ id }) =>{
    try {
        const category = await Category.findByPk(id,{ paranoid: false })
        if(!category){
            return null
        }
        return await category.restore()
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteCategory = async ({ id }) =>{
    try {
        return Category.destroy({ where: { id }, force: true })           
    } catch (error) {
        throw error;
    }
}