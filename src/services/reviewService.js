const { Op } = require('sequelize')
const { NotFoundError } = require('../utils/errors')

const Review = require('../models/review');
const Product = require('../models/product');


exports.getReviews = async ({ page , limit, sortBy, sortOrder, name, slug })=>{
    try {
        const whereCondition = {};
        if (name) whereCondition.name = { [Op.iLike]: `%${name}%` }
        if (slug) whereCondition.slug = { [Op.iLike]: `%${slug}%` }

        const order = sortBy ? [[sortBy, sortOrder || 'ASC']] : [['created_at', 'DESC']]
        const options = {
            limit: limit,
            offset: (page - 1) * limit || 0,
            where: whereCondition,
            order,
        };
        const data = await Review.findAndCountAll(options)
        if(data.count === 0){
            throw new NotFoundError('There are no Reviews')
        }
        const response = {
            totalPages : Math.ceil(data.count/limit),
            totalItems :data.count ,
            reviews : data.rows
        }
        return response
    } catch (error) {
        throw error
    }
}

exports.getReview = async (id)=>{
    try {
        const review =  await Review.findByPk(id) 
        if(!review){
            throw new NotFoundError(`Review ${id} not found`)
        }
        return review
    } catch (error) {
        throw error
    }
}

const CalcAverageRating = async (productId) => {
    const product = await Product.findByPk(productId);
    const reviews = await Review.findAll({
      where: { productId: productId },
    });
    let averageRating = 0 
    const totalRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
    averageRating = totalRatings / reviews.length;
  
    product.averageRating = averageRating;
    await product.save();
};

exports.createReview = async (data) =>{
    try {
        const {userId , productId, content, ratings} = data
        const review =  await Review.create({userId , productId, content, ratings})
        await CalcAverageRating(review.productId)

        return review ;
    } catch (error) {
        throw error;
    }
}

exports.updateReview = async (id,data) =>{
    try {
        const {userId , productId, content, ratings} = data
        let review = await Review.findByPk(id)

        if(!review){
            throw new NotFoundError(`Review ${id} not found`)
        }
        review = await review.update({userId , productId, content, ratings})
        await CalcAverageRating(review.productId)
        return review

    } catch (error) {
        throw error;
    }
}

exports.deleteReview = async (id)=>{
    try {
        const review = await Review.findByPk(id)
        if(!review){
            throw new NotFoundError(`Review ${id} not found`)
        }
        return await review.destroy()
    } catch (error) {
        throw error;
    }
}

exports.restoreReview = async (id) =>{
    try {
        const review = await Review.findByPk(id, { paranoid: false });
        if(review && review.deletedAt !== null){
            return await review.restore()   
        }    
        throw new NotFoundError(`Review ${id} not found`)
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteReview = async (id) =>{
    try {
        const review= await Review.findByPk(id, { paranoid: false });
        if(review && review.deletedAt !== null){
            return await review.destroy({force: true })   
        }    
        throw new NotFoundError(`Review ${id} not found`)        
    } catch (error) {
        throw error;
    }
}

exports.allTrashReviews = async () =>{
    try {
        const reviews = Review.findAll({
            where: {
                deletedAt: { [Op.ne]: null }
            },
            paranoid: false
        })
        if(!reviews){
            throw new NotFoundError('There are no Reviews in Trash')
        }
        return reviews
    } catch (error) {
        throw error;
    }
}