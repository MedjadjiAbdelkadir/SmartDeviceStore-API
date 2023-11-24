const { Op } = require('sequelize')
const { NotFoundError } = require('../utils/errors')

const Attribute = require('../models/attribute');


exports.getAttributes = async ({ page , limit, sortBy, sortOrder, name, slug })=>{
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
        const data = await Attribute.findAndCountAll(options)
        if(data.count === 0){
            throw new NotFoundError('There are no attributes')
        }
        const response = {
            totalPages : Math.ceil(data.count/limit),
            totalItems :data.count ,
            attributes : data.rows
        }
        return response
    } catch (error) {
        throw error
    }
}

exports.getAttribute = async (id)=>{
    try {
        const attribute =  await Attribute.findByPk(id) 
        if(!attribute){
            throw new NotFoundError(`Attribute ${id} not found`)
        }
        return attribute
    } catch (error) {
        throw error
    }
}

exports.createAttribute = async (name, slug) =>{
    try {
        return await Attribute.create({name, slug})
    } catch (error) {
        throw error;
    }
}

exports.updateAttribute = async (id , name , slug) =>{
    try {
        const attribute = await Attribute.findByPk(id)
        if(!attribute){
            throw new NotFoundError(`Attribute ${id} not found`)
        }
        return await attribute.update({name, slug})
    } catch (error) {
        throw error;
    }
}


exports.deleteAttribute = async (id)=>{
    try {
        const attribute = await Attribute.findByPk(id)
        if(!attribute){
            throw new NotFoundError(`Attribute ${id} not found`)
        }
        return await attribute.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreAttribute = async (id) =>{
    try {
        const attribute = await Attribute.findByPk(id, { paranoid: false });
        if(attribute && attribute.deletedAt !== null){
            return await attribute.restore()   
        }    
        throw new NotFoundError(`Attribute ${id} not found`)
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteAttribute = async (id) =>{
    try {
        const attribute= await Attribute.findByPk(id, { paranoid: false });
        if(attribute && attribute.deletedAt !== null){
            return await attribute.destroy({force: true })   
        }    
        throw new NotFoundError(`Attribute ${id} not found`)        
    } catch (error) {
        throw error;
    }
}

exports.allTrashAttributes = async () =>{
    try {
        const attributes = Attribute.findAll({
            where: {
                deletedAt: { [Op.ne]: null }
            },
            paranoid: false
        })
        if(!attributes){
            throw new NotFoundError('There are no attributes in Trash')
        }
        return attributes

    } catch (error) {
        throw error;
    }
}