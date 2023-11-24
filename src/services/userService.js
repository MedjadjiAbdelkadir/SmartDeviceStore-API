const User = require('../models/user')
const { NotFoundError } = require('../utils/errors')

exports.getProfile = async (id)=>{
    try {
        const profile =  await User.findByPk(id) 
        if(!profile){
            throw new NotFoundError(`Profile ${id} not found`)
        }
        return profile
    } catch (error) {
        throw error
    }
}

exports.updateProfile = async (id ,firstName, lastName, phone) =>{
    try {
        const profile =  await User.findByPk(id) 
        if(!profile){
            throw new NotFoundError(`Profile ${id} not found`)
        }
        return await profile.update({firstName, lastName, phone})
    } catch (error) {
        throw error;
    }
}

exports.updateAvatarProfile = async (id ,image) =>{
    try {
        const profile =  await User.findByPk(id) 
        if(!profile){
            throw new NotFoundError(`Profile ${id} not found`)
        }
        return await profile.update({
            profilePicture:image
        })
    } catch (error) {
        throw error;
    }
}

exports.deleteAccount = async (id)=>{
    try {
        const user = await User.findByPk(id)
        if(!user){
            throw new NotFoundError(`User ${id} not found`)
        }
        return await user.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreAccount = async (id) =>{
    try {
        const account = await User.findByPk(id, { paranoid: false });
        if(account && account.deletedAt !== null){
            return await account.restore()   
        }    
        throw new NotFoundError(`Account ${id} not found`)
    } catch (error) {
        throw error;
    }
}