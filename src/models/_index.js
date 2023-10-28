const db = require('../config/database');

require('../database/associations')
require('../database/hooks')

db.sync({alter: true })
.then(() => console.log('Updated DB Successfully'))
.catch((err) => {console.log(err.message)});



// Attribute.belongsToMany(Product, { through: ProductAttribute ,as: 'attributes'});

// Product.belongsToMany(Attribute, { through: ProductAttribute , as :'features'});
// Attribute.belongsToMany(Product, { through: ProductAttribute , as : 'features'});

// Product.belongsToMany(ProductAttribute , { through: ProductAttribute ,as: 'values'});


/*
Product.belongsToMany(Attribute, { through: ProductAttribute,as: 'features' });
Attribute.belongsToMany(Product, { through: ProductAttribute });

*/
// Product.hasMany(ProductAttribute, {
//     foreignKey:{
//         name : 'ProductId',
//         unique : false,
//     },
// });
// ProductAttribute.hasMany(Attribute,{
//     foreignKey:{
//         name : 'AttributeId',
//         unique : false
//     },
// });
/*
Product.belongsToMany(Attribute, { through: ProductAttribute , as :'features'});
// Product.belongsToMany(ProductAttribute , { through: ProductAttribute ,as: 'values'});

Product.hasMany(ProductAttribute, {
    foreignKey:{
        name : 'ProductId',
        unique : false,
    },
});
Attribute.hasMany(ProductAttribute,{
    foreignKey:{
        name : 'AttributeId',
        unique : false
    },
    
});

/*

Attribute.belongsToMany(Product, { through: ProductAttribute , as : ''});

Product.belongsToMany(ProductAttribute , { through: ProductAttribute ,as: 'values'});
*/





