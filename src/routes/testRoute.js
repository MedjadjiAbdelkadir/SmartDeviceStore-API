const express = require('express')
const { auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/' , auth, (req, res, next) => {
    console.log(req.user.id);
    res.status(200).json({
        status : true, 
        message : 'Test successful',
    })
})

module.exports = router