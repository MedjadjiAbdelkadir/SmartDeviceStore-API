const {DataTypes} = require('sequelize');
const db = require('../config/database');

const Attribute = db.define('Attribute', {
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
        }
    },
    slug :{
        type : DataTypes.STRING,
    },
}, {
    tableName: 'attributes',
    timestamps : true, 
    paranoid: true,
})

Attribute.sync({alter : true})
.then(() => console.log(`Create attributes Table...`)) 
.catch(error => console.log(error.message));

module.exports = Attribute;