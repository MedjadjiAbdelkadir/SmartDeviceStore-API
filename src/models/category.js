const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Category = db.define('category', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
    },
    name : {
        type : DataTypes.STRING,
        allowNull :false,
        unique: true,
        validate: {
            notNull : true,
            min:5,
            max:6,
        }
    },
    slug :{
        type : DataTypes.STRING,
    },
    // image : {
    //     type : DataTypes.STRING,
    //     allowNull: false, 
    //     defaultValue :'category-default-image.jpeg',

    //     get() {
    //         return `${process.env.BASE_URL}/uploads/categories/${this.getDataValue('image')}`
    //     },
    // }
}, {

    tableName: 'categories',
    modelName : 'Category',
    timestamps : true, 
    paranoid: true,
})

Category.sync({alter: true})
.then(() => console.log(`Create categories Table...`)) 
.catch(error => console.error(error.message));

module.exports = Category;