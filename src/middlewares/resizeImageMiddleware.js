const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid')

const ApiError = require('../utils/apiError')
const statusCodes = require('../utils/statusCodes');

exports.resizeBrandImage =  asyncHandler(async (req, res, next) => {
    if(req.file && req.file.buffer){
        const filename= `brands-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 100})
        .toFile(`src/uploads/brands/${filename}`)
        .then(()=> {
            req.body.image = filename
            console.log(req.body.image);
        }).catch(err => new ApiError(err.message , statusCodes.BAD_REQUEST))
    }
    next()
})

exports.resizeSubCategoryImages =  asyncHandler(async (req, res, next) => {
    // resize single image
    if(req.files.image){
        const imageName = `subcategories-${uuidv4()}-${Date.now()}-cover.jpeg`;
        await sharp(req.files.image[0].buffer)
        .resize(1000, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`src/uploads/subcategories/${imageName}`)
        req.body.image = imageName;
    }
    // resize array of images
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (img, index) => {
                const imageName = `sub-category-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

                await sharp(img.buffer)
                .resize(600, 600)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(`src/uploads/subcategories/${imageName}`);
                req.body.images.push(imageName);
            })
        )
    }
    next()
})

exports.resizeMultiImages =   asyncHandler(async (req, res, next) => {

    // resize single image
    if(req.files.image){
        const imageName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
        await sharp(req.files.image[0].buffer)
        // .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`src/uploads/products/${imageName}`)
        req.body.image = imageName;
    }
    // resize array of images
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (img, index) => {
                const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

                await sharp(img.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(`src/uploads/products/${imageName}`);
                req.body.images.push(imageName);
            })
        )
    }
    next()
});