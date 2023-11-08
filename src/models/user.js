const { DataTypes } = require('sequelize')

const db = require('../database/config/database')

const User = db.define("User", {
    id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey: true,
        defaultValue :DataTypes.UUIDV4,
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull :false,
        field: 'first_name',
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull :false,
        field: 'last_name',
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
        field: 'password_changed_at',
    },
    passwordResetCode : {
        type : DataTypes.STRING,
        field: 'password_reset_code',
    },
    passwordResetExpires : {
        type : DataTypes.DATE,
        field: 'password_reset_expires',
    },
    passwordResetVerified :{
        type : DataTypes.BOOLEAN,
        field: 'password_reset_verified',
    },
    profilePicture : {
        type : DataTypes.STRING,
        allowNull: false, 
        field: 'profile_picture',
        defaultValue :'userProfile-default-image.jpeg',
        get() {
            return `${process.env.BASE_URL}/uploads/users/${this.getDataValue('profilePicture')}`
        },
    }

},{
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    paranoid: true, 
    tableName:'users',
    modelName: 'User',
});

module.exports = User;

