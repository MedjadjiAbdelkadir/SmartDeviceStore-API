const Product = require('../models/product')
const Review = require('../models/review')

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

exports.getReviews = async () => {
    try {
        return await Review.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
    } catch (error) {
        throw error;
    }
}

exports.getReview = async ({id}) =>{
    try {
        return await Review.findByPk(id)      
    } catch (error) {
        throw error;
    }
} 

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

exports.updateReview = async (data) =>{
    try {
        const {id, userId , productId, content, ratings} = data
        let review = await Review.findByPk(id)
        if(!review){
            const error = new Error()
            error.message = `This Review Not Found`
            error.status = 404
            throw error
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
            const error = new Error()
            error.message = `This Review ${id} Not Found`
            error.status = 404
            throw error
        }
        const {productId} = review
        console.log('review',review.productId);
        await review.destroy()
        await CalcAverageRating(productId)
        return true
    } catch (error) {
        throw error;
    }
}

exports.restoreReview = async (id) =>{
    try {
        const review = await Review.findByPk(id,{ paranoid: false })
        if(!review){
            const error = new Error()
            error.message = `This Review Not Found`
            error.status = 404
            throw error
        }
        return await review.restore()        
    } catch (error) {
        throw error;
    }
}

exports.forceDeleteReview = async (id) =>{
    try {
        return Review.destroy({ where: { id }, force: true })           
    } catch (error) {
        throw error;
    }
}