const User = require('../models/user')

exports.getUsers = async () => {
    try {
        return await User.findAll({
            order: [
                ['created_at', 'ASC'],
            ],
        })
    } catch (error) {
        throw error;
    }
}
exports.getUser = async (id) =>{
    try {
        return await User.findByPk(id)      
    } catch (error) {
        throw error;
    }
} 

exports.updateUser = async (data) =>{
    try {
        const {id ,firstName,lastName,phone} = data
        const user = await User.findByPk(id)
        if(!user){
            return null
        }
        return await user.update({
            firstName,lastName,phone
        })
    } catch (error) {
        throw error;
    }
}




