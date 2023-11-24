const express = require('express')

const {register, login, forgotPassword, verifyResetCode, resetPassword, } = require('../controllers/authController')
const { loginValidator, registerValidator, forgotPasswordValidator, verifyResetCodeValidator, resetPasswordValidator } = require('../utils/validators/authValidator')

const router = express.Router()

router.post('/register',registerValidator , register)
router.post('/login', loginValidator, login)

router.post('/forgotPassword',forgotPasswordValidator, forgotPassword)
router.post('/verifyResetCode',verifyResetCodeValidator, verifyResetCode)
router.post('/resetPassword',resetPasswordValidator, resetPassword)


module.exports = router
