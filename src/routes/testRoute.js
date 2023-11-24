const express = require('express')
const { auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/' , auth, (req, res, next) => {
    res.status(200).json({
        status : true, 
        message : 'Test successful',
    })
})



router.get('/remove', (req, res, next) => {

})
module.exports = router