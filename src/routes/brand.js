const express = require('express')

const { 
    getBrands, getBrand, createBrand, updateBrand, 
    deleteBrand, restoreBrand, forceDeleteBrand 
} = require('../controllers/brandController')

const { 
    getBrandValidator, createBrandValidator, updateBrandValidator,
    deleteBrandValidator, restoreBrandValidator, forceDeleteBrandValidator 
} = require('../utils/validators/brandValidator')


const { uploadSingleImageMiddleware  } = require('../middlewares/uploadImageMiddleware')
const { resizeBrandImage , resizeMultiImages } = require('../middlewares/resizeImageMiddleware')
const { auth } = require('../middlewares/authenticateMiddleware')
const { allowedTo } = require('../middlewares/permissionsMiddleware')
// ------------------------------------------------------------------

const UploadBrandImage = uploadSingleImageMiddleware('image')
// const uploadMultiImage = uploadMultiImageMiddleware([
//     { name: 'image', maxCount: 1 },
//     { name: 'images', maxCount: 8 }
// ])

/*
const resizeMultiImages = asyncHandler(async (req, res, next) => {
    if(req.files.image){
        const imageName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`
        await sharp(req.files.image[0].buffer)
        // .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`src/uploads/products/${imageName}`)
        req.body.image = imageName
    }
    if (req.files.images) {
        req.body.images = []
        await Promise.all(
            req.files.images.map(async (img, index) => {
                const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`

                await sharp(img.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(`src/uploads/products/${imageName}`)
                req.body.images.push(imageName)
            })
        )
    }
    next()
})
*/




// ----------------------------------------------------------------------
const router = express.Router()

router.get('/', auth , allowedTo('admin') ,getBrands)
router.get('/:id', getBrandValidator ,  getBrand)

router.post('/', UploadBrandImage ,resizeBrandImage, (req, res, next)=>{
    console.log('name :' , req.body.name)
    console.log('image :' , req.body.image)
    next()
},createBrandValidator, createBrand)

// router.post('/',   uploadMultiImages , resizeMultiImages, (req, res, next)=>{
//     console.log('image :' , req.body.image)
//     console.log('images :' , req.body.images)
// },createBrandValidator, createBrand)

// router.post('/',   uploadSingleImage("image") , resizeBrandImage,createBrandValidator, createBrand)
router.patch('/:id', updateBrandValidator ,updateBrand)
router.delete('/:id', deleteBrandValidator, deleteBrand)


router.patch('/restore/:id', restoreBrandValidator , restoreBrand )
router.delete('/force/:id', forceDeleteBrandValidator ,forceDeleteBrand)
module.exports = router