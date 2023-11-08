// const {Attribute} = require("../models/");

const Attribute = require("../../models/attribute")

/* -------------------- Beginning of Hooks -------------------- */

Attribute.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['slug','created_at','updated_at','deleted_at'], 
    }
})
/* -------------------- End of Hooks -------------------- */
