const express = require('express')

const { 
    getUsers, getUser, updateUser, 
} = require('../controllers/userController')

const { 
    getUserValidator, updateUserValidator
} = require('../utils/validators/userValidator')

const { auth } = require('../middlewares/authenticateMiddleware')
const { allowedTo } = require('../middlewares/permissionsMiddleware')
// ----------------------------------------------------------------------
const router = express.Router()
router.use(auth)
router.get('/', allowedTo('admin'), getUsers)
router.get('/:id', getUserValidator ,  getUser)
router.patch('/:id', updateUserValidator ,updateUser)

module.exports = router