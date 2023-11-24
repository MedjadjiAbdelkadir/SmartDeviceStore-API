const multer = require("multer")
const { v4: uuidv4 } = require('uuid')
const APIError = require("../utils/apiError")
const { StatusCodes } = require("../utils/status")

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
            cb(new APIError('The file must be an image', StatusCodes.BAD_REQUEST), false)
        }
    }
    const upload = multer({ storage: multerMemory , fileFilter:multerFilterFile })
    return upload ;
} 

exports.uploadSingleImageMiddleware = (image) => multerUploadImageOptions().single(image)