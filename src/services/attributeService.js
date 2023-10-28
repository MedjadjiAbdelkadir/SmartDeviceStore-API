const Attribute = require('../models/attribute')

exports.getAttributes = async () => {
    try {
        return await Attribute.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
    } catch (error) {
        throw error;
    }
}

exports.getAttribute= async ({id}) =>{
    try {
        return await Attribute.findByPk(id)      
    } catch (error) {
        throw error;
    }
} 

exports.createAttribute = async ({name, slug}) =>{
    try {
        return await Attribute.create({name,slug})
    } catch (error) {
        throw error;
    }
} 

exports.updateAttribute = async ({id , name, slug}) =>{
    try {
        const attribute = await Attribute.findByPk(id)
        if(!attribute){
            return null
        }
        return await attribute.update({name,slug})
    } catch (error) {
        throw error;
    }
}

exports.deleteAttribute = async ({ id })=>{
    try {
        const attribute = await Attribute.findByPk(id)
        if(!attribute){
            return null
        }
        return await attribute.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreAttribute = async ({ id }) =>{
    try {
        const attribute = await Attribute.findByPk(id,{ paranoid: false })
        if(!attribute){
            return null
        }
        return await attribute.restore()        
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteAttribute = async ({ id }) =>{
    try {
        return Attribute.destroy({ where: { id }, force: true })           
    } catch (error) {
        throw error;
    }
}