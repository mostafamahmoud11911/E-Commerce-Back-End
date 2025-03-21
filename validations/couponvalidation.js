import joi from "joi";


export const addCouponSchema = joi.object({
    code: joi.string().min(1).max(50).required(),
    disCount: joi.number().min(0).required(),
    expireCode: joi.date().required(),
})

export const updateCouponSchema = joi.object({
    id: joi.string().required(),
    code: joi.string().min(1).max(50),
    disCount: joi.number().min(0),
    expireCode: joi.date(),
});


export const getCouponSchema = joi.object({
    id: joi.string().required(),
})