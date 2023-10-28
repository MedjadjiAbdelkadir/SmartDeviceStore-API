const {DataTypes} = require('sequelize');
const db = require('../config/database');

const SubCategory = db.define('SubCategory', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
    },
    categoryId : {
        type : DataTypes.UUID,
        allowNull :false
    },
    name : {
        type : DataTypes.STRING,
        allowNull :false,
        unique: true,
        validate :{
            min:5,
            max:50,
        }
    },
    slug :{
        type : DataTypes.STRING,
    },
    image : {
        type : DataTypes.STRING,
        allowNull: false, 
        defaultValue :'sub-category-default-image.jpeg',
        get() {
            return `${process.env.BASE_URL}/uploads/subcategories/${this.getDataValue('image')}`
        },
    }
}, {
    tableName: 'subcategories',
    timestamps : true, 
    paranoid: true,
})

SubCategory.sync()
.then(() => {console.log(`Create subcategories Table...`)}) 
.catch(error => console.error(error.message));

module.exports = SubCategory;