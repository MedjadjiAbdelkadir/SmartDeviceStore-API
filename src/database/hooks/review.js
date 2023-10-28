/* eslint-disable no-use-before-define */

const Product = require("../../models/product");
const Review = require("../../models/review");
const User = require("../../models/user");

/* -------------------- Beginning of Hooks -------------------- */


Review.addHook('beforeFind', (options) => {
    options.attributes = {
        exclude: ['userId','updatedAt','deletedAt'], 
        // attributes : ['id' ,'name', 'slug', 'description', 'quantity', 'price', 'priceAfterDiscount'] ,

    }
    options.include = [
        {
            model: Product,
            as: 'products', 
            attributes: ['id','name'], 
        },
        {
            model: User,
            as: 'users', 
            attributes: ['lastName','firstName','profilePicture'], 
        },
    ]
})


// Review.addHook('afterCreate', async (review, options) => {
//     await updateProductAverageRating(review.productId);
// });

// Review.addHook('beforeUpdate', async (review, options) => {
//     await updateProductAverageRating(review.productId);
// });

// Review.addHook('beforeDestroy', async (review, options) => {
//     await updateProductAverageRating(review.productId);
// });

// const updateProductAverageRating = async (productId) => {
//     const product = await Product.findByPk(productId);
//     const reviews = await Review.findAll({
//       where: { productId: productId },
//     });
  
//     const totalRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
//     const averageRating = totalRatings / reviews.length;
  
//     product.averageRating = averageRating;
//     await product.save();
// };
/* -------------------- End of Hooks -------------------- */
