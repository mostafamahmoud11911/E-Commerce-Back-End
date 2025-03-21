import joi from "joi";



export const addBrandSchema = joi.object({
    name: joi.string().min(1).max(50).required(),
    image: joi
        .object({
            filename: joi.string().required(),
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi
                .string()
                .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
                .required(),
            destination: joi.string().required(),
            path: joi.string().required(),
            size: joi.number().max(5242880).required(),
        })
        .required(),
});

export const updateBrandSchema = joi.object({
    id: joi.string().required(),
    name: joi.string().min(1).max(50),
    image: joi.object({
        filename: joi.string(),
        fieldname: joi.string(),
        originalname: joi.string(),
        encoding: joi.string(),
        mimetype: joi
            .string()
            .valid("image/jpeg", "image/png", "image/gif", "image/jpg"),
        destination: joi.string(),
        path: joi.string(),
        size: joi.number().max(5242880),
    }),
});


export const getBrandSchema = joi.object({
    id: joi.string().required(),
});