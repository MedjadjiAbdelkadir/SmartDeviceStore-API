/* -------------------- Beginning of Hooks -------------------- */

const Attribute = require("../../models/attribute");

Attribute.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['slug','createdAt','updatedAt','deletedAt'], 
    }
})
/* -------------------- End of Hooks -------------------- */