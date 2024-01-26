import Joi from "joi";

export const addcompanyschema={
    body:Joi.object({
            companyname:Joi.string().required().min(3).max(15).alphanum(),
            description:Joi.string(),
            industry:Joi.string().required().min(3).max(20).alphanum(),
            address:Joi.string(),
            numberOfEmployee:Joi.number().min(11).max(20),
            companyEmail:Joi.string().email().required()
        }
    )
}
export const updateompanyschema={
    body:Joi.object({
            companyname:Joi.string().required().min(3).max(15).alphanum(),
            description:Joi.string(),
            industry:Joi.string().required().min(3).max(20).alphanum(),
            address:Joi.string(),
            numberOfEmployee:Joi.number().min(11).max(20),
            companyEmail:Joi.string().email().required()
        }
    )
}
