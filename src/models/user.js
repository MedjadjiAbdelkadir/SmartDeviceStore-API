const {DataTypes} = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull :false,
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull :false,
    },    
    email : {
        type : DataTypes.STRING,
        allowNull :false,
        unique: true,
    },
    phone : {
        type : DataTypes.STRING,
        allowNull :false,
        unique: true,
    },
    role : {
        type : DataTypes.ENUM,
        values : ['admin','manager','user'],
        allowNull :false,
        defaultValue : 'user'
    },
    password : {
        type : DataTypes.STRING,
        allowNull :false,
    },
    passwordChangedAt:{
        type : DataTypes.DATE,
    },
    passwordResetCode : {
        type : DataTypes.STRING,
    },
    passwordResetExpires : {
        type : DataTypes.DATE,
    },
    passwordResetVerified :{
        type : DataTypes.BOOLEAN,
    },
    profilePicture : {
        type : DataTypes.STRING,
        allowNull: false, 
        defaultValue :'userProfile-default-image.jpeg',
        get() {
            return `${process.env.BASE_URL}/uploads/users/${this.getDataValue('profilePicture')}`
        },
    }

}, {
    tableName: 'users',
    timestamps : true, 
    paranoid: true,
})

User.sync({alter : true})
.then(() => console.log(`Create users Table...`)) 
.catch(error => console.log(error.message));

module.exports = User;