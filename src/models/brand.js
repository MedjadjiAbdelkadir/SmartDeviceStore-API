const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Brand = db.define('Brand', {
    id : {
        type : DataTypes.UUID,
        defaultValue :DataTypes.UUIDV4,
        primaryKey : true,
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
        defaultValue :'brand-default-image.jpeg',
        get() {
            return `${process.env.BASE_URL}/uploads/brands/${this.getDataValue('image')}`
        },
    }
}, {
    tableName: 'brands',
    timestamps : true, 
    paranoid: true,
})

Brand.sync({alter : true})
.then(() => console.log(`Create brands Table...`)) 
.catch(error => console.log(error.message));

module.exports = Brand;