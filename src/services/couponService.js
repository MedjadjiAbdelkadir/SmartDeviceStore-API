const Coupon = require("../models/coupon");

exports.getCoupons = async () => {
    try {
        return await Coupon.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
        })
    } catch (error) {
        throw error;
    }
}

exports.getCoupon = async ({id}) =>{
    try {
        return await Coupon.findByPk(id)      
    } catch (error) {
        throw error;
    }
} 

exports.createCoupon = async (data) =>{
    try {
        let {targetId} = data
        const {type, code, discount, startAt, expiresAt, createdBy} = data
        if(targetId ===''){
            targetId = null;
        }

        return await Coupon.create({
            type,
            targetId:targetId, 
            code, 
            discount, 
            startAt, 
            expiresAt,
            createdBy
        })
    } catch (error) {
        throw error;
    }
} 

exports.updateCoupon = async (data) =>{
    try {
        const {id, code, discount, startAt, expiresAt} = data
        const coupon = await Coupon.findByPk(id)
        if(!coupon){
            const error = new Error()
            error.message = `This Coupon Not Found`
            error.status = 404
            throw error
        }
        return await Coupon.update({code, discount, startAt, expiresAt})
    } catch (error) {
        throw error;
    }
}

exports.deleteCoupon = async (id)=>{
    try {
        const coupon = await Coupon.findByPk(id)
        if(!coupon){
            const error = new Error()
            error.message = `This Coupon Not Found`
            error.status = 404
            throw error
        }
        return await Coupon.destroy()
    } catch (error) {
        throw error;
    }
}
