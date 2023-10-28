const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    const salt = parseInt(process.env.PASSWORD_SALT, 10)
    await bcrypt.genSalt(salt);
    return await bcrypt.hash(password,salt)
}

exports.comparePassword = async (password , hash) => await bcrypt.compare(password, hash)




