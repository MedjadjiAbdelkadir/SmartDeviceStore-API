const express = require('express')

const { 
    getAttributes, getAttribute, createAttribute, updateAttribute, 
    deleteAttribute, restoreAttribute, forceDeleteAttribute 
} = require('../controllers/attributeController')

const { 
    getAttributeValidator, createAttributeValidator, updateAttributeValidator, 
    restoreAttributeValidator, forceDeleteAttributeValidator 
} = require('../utils/validators/attributeValidator')



const router = express.Router()


router.get('/', getAttributes)
router.get('/:id', getAttributeValidator , getAttribute)
router.post('/', createAttributeValidator ,createAttribute)
router.patch('/:id', updateAttributeValidator , updateAttribute)
router.delete('/:id', deleteAttribute)


router.patch('/restore/:id', restoreAttributeValidator ,restoreAttribute )
router.delete('/force/:id', forceDeleteAttributeValidator ,forceDeleteAttribute)
module.exports = router