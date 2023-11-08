const SubCategory = require('../models/subCategory')

// where: categoryId !== undefined ? {deletedAt: null, categoryId: Number(categoryId) } : {deletedAt: null},

exports.getSubCategories = async () =>{
    try {
        return await SubCategory.findAll({
            order: [
                ['created_at', 'ASC'],
            ]
        })
    } catch (error) {
        throw error;
    }
} 

exports.getSubCategory = async ({id}) => {
    try {
        return await SubCategory.findByPk(id, { include: ['subcategories'] })
    } catch (error) {
        throw error
    }
} 

exports.createSubCategory = async ({categoryId, name, slug, image,images}) =>{
    try {
        console.log('Service : ',categoryId, name, slug, image,images);
        return await SubCategory.create({categoryId, name, slug, image,images})
    } catch (error) {
        throw error;
    }
}

exports.updateSubCategory = async ({id, categoryId, name, slug, image}) =>{
    try {
        const subcategory = await SubCategory.findByPk(id)
        if(!subcategory){
            return null
        }
        return await subcategory.update({categoryId, name, slug, image})
    } catch (error) {
        throw error;
    }
}

exports.deleteSubCategory = async ({ id })=>{
    try {
        const subcategory = await SubCategory.findByPk(id)
        if(!subcategory){
            return null
        }
        return await subcategory.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreSubCategory = async ({ id }) =>{
    try {
        const subcategory = await SubCategory.findByPk(id,{ paranoid: false })
        if(!subcategory){
            return null
        }
        return await subcategory.restore()
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteSubCategory = async ({ id }) =>{
    try {
        return SubCategory.destroy({ where: { id }, force: true })           
    } catch (error) {
        throw error;
    }
}