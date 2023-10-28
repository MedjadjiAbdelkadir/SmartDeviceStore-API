const crypto = require('crypto')

const {hashPassword ,comparePassword} = require('../utils/passwordUtils')
const { createToken } = require('../utils/tokenUtils')
const sendEmail = require('../utils/sendEmail')

const User = require('../models/user')


exports.register = async (data) =>{
    try {
        const {firstName,lastName, email,phone,password} = data   
        const passwordHash = await hashPassword(password)
        const user =  await User.create({
            firstName,lastName, email,phone,
            password : passwordHash
        })
        const token = await createToken(user.id)
        return {
            user , token
        }
    } catch (error) {
        throw error
    }
}

exports.login = async (data) =>{
    try {
        const {email ,password} = data   
        const user  = await User.findOne({
            where : {email: email}
        })
        if(user && await comparePassword(password, user.password)){
            const token = await createToken(user.id)
            return {
                user , token
            }
        }
        return null
    } catch (error) {
        throw error
    }
}

exports.forgotPassword = async (email) =>{
    
    // 1) Find user by email
    const user = await User.findOne({
        where : {email}
    })

    if(!user){
        const error = new Error()
        error.message = `There is no user with that email ${email}`
        error.status = 404
        throw error
    }

    // 2) If user exist, Generate hash reset random 6 digits and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex')

    // Save hashed password reset code into db
    user.passwordResetCode = hashedResetCode
    // Add expiration time for password reset code (10 min)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000
    user.passwordResetVerified = false

    await user.save()

    const message = `<html>
        <body>
            <div class="send-resetCode" style="margin: 0 padding: 40px 0 background-color: #f0f0f0">
                <div class="" style="background-color: #ffffff padding: 20pxborder-radius: 10pxwidth: 80%margin: 0 auto">
                    <p>Hi ${user.lastName} ${user.firstName},</p>
                    <p>We received a request to reset the password on your SmartDeviceStore Account.
                    </p>
                    <p class=""> 
                        Your Password Reset Code :
                        <span  style="color: #394f5dfont-weight: boldletter-spacing: 1px">
                            ${resetCode}
                        </span>
                    </p>
                    <p>Thanks SmartDeviceStore team</p>
                </div>
            </div>
        </body>
    </html>`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            html:message
        })

        return true
    } catch (error) {
        user.passwordResetCode = undefined
        user.passwordResetExpires = undefined
        user.passwordResetVerified = undefined
    
        await user.save()
        throw error
    }
}

exports.verifyResetCode = async(resetCode)=>{
    try {
        // 1) Get user based on reset code
        const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex')

        // 1) Find user by email
        const user = await User.findOne({
            where : {passwordResetCode : hashedResetCode}
        })

        if(!user){
            const error = new Error()
            error.message = `Reset code ${resetCode} invalid or expired`
            error.status = 404
            throw error
        }
        // 2) Reset code valid
        user.passwordResetVerified = true
        await user.save()
        return true
    } catch (error) {
        throw error       
    }
}

exports.resetPassword = async (email,newPassword)=>{
    try {
        // 1) Find user by email
        const user = await User.findOne({
            where : {
                email:email,
                // passwordResetExpires: { $gt: Date.now() },
            }
        })

        if(!user){
            const error = new Error()
            error.message = `There is no user with that email ${email}`
            error.status = 404
            throw error
        }
          // 2) Check if reset code verified
        if (!user.passwordResetVerified) {
            const error = new Error()
            error.message = `Reset code not verified`
            error.status = 400
            throw error
        }
        user.password = await hashPassword(newPassword)
        user.passwordChangedAt = Date.now()
        user.passwordResetCode = undefined
        user.passwordResetExpires = undefined
        user.passwordResetVerified = undefined
        await user.save()

        const token = await createToken(user.id)

        return token
    } catch (error) {
        throw error 
    }
}
