const multer = require("multer")
const { v4: uuidv4 } = require('uuid')

const ApiError = require("../utils/apiError")
const statusCodes = require("../utils/statusCodes")

const multerUploadImageOptions = () => {
    /*
    // 1) use  DiskStorage engine
    const multerStorage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'src/uploads/brands/')
        },
        filename: function (req, file, cb) {
            const ext = file.mimetype.split('/')[1]
            const filename= `brands-${uuidv4()}-${Date.now()}.${ext}`;
            req.body.image = filename
        cb(null, filename) 
        }
    })
    */

    //  2) use  memoryStorage engine
    const multerMemory = multer.memoryStorage()
    const multerFilterFile =  function(req, file, cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }else{
            cb(new ApiError('The file must be an image', statusCodes.BAD_REQUEST), false)
        }
    }

    const upload = multer({ storage: multerMemory , fileFilter:multerFilterFile })
    return upload ;
} 

exports.uploadSingleImageMiddleware = (image) => multerUploadImageOptions().single(image)

exports.uploadMultiImageMiddleware = (arrayImages) => multerUploadImageOptions().fields(arrayImages)
// exports.uploadSingleImage = (image) => multerUploadImageOptions().single(image)

// exports.uploadMultiImages = (arrayImages) => multerUploadImageOptions().fields(arrayImages)
