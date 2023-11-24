const express = require('express')

const { getAttributes, getAttribute, updateAttribute, deleteAttribute, createAttribute, allTrashAttributes, restoreAttribute, forceDeleteAttribute } = require('../controllers/attributeController')
const { getAttributeValidator, createAttributeValidator, updateAttributeValidator, deleteAttributeValidator, restoreAttributeValidator, forceDeleteAttributeValidator } = require('../utils/validators/attributeValidator')
const { allowedTo } = require('../middleware/permissionsMiddleware')


const router = express.Router()

router.get('/' , getAttributes)
router.get('/trash',allowedTo('admin'), allTrashAttributes)
router.get('/:id' ,getAttributeValidator, getAttribute)
router.use(allowedTo('admin'))
router.post('/',createAttributeValidator, createAttribute)
router.patch('/:id',  updateAttributeValidator ,updateAttribute)
router.delete('/:id', deleteAttributeValidator, deleteAttribute)


router.patch('/restore/:id', restoreAttributeValidator , restoreAttribute)
router.delete('/force-delete/:id', forceDeleteAttributeValidator ,forceDeleteAttribute)
// trash
module.exports = router