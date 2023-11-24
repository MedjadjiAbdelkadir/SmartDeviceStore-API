const express = require('express')

const { uploadSingleImageMiddleware } = require("../middleware/uploadImageMiddleware")
const { getProfile, resizeUpdateAvatarProfile, updateProfile, updateAvatarProfile, deleteAccount, restoreAccount } = require('../controllers/userController')
const { getProfileValidator, updateProfileValidator,updateProfileAvatarValidator, deleteAccountValidator,restoreAccountValidator  } = require('../utils/validators/userValidator')

const { allowedTo } = require('../middleware/permissionsMiddleware')

const UploadAvatarProfile = uploadSingleImageMiddleware('image')

const router = express.Router()
router.use(allowedTo('user'))

router.get('/' ,getProfileValidator,getProfile)
router.patch('/', updateProfileValidator,updateProfile)
router.patch('/avatar', UploadAvatarProfile,resizeUpdateAvatarProfile,updateProfileAvatarValidator, updateAvatarProfile)
router.delete('/', deleteAccountValidator,deleteAccount)
router.patch('/restore' , restoreAccountValidator,restoreAccount )

module.exports = router