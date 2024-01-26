import Joi from "joi"
//alphanum take numbers 0-9 or chars a-z,A-Z
//email ensure the it has email format
export const signupschema={
    body:Joi.object({
        firstName:Joi.string().required().min(3).max(10).alphanum(),
        lastName:Joi.string().required().min(3).max(10).alphanum(),
        email:Joi.string().email().required(),//i don't think i need to allow or deny some domains so i leave email as default
        password:Joi.string().required().min(4).max(10),//i make it like that to be easy with testing we should increase min chars
        recoveryEmail:Joi.string().email().required(),
        DOB:Joi.string().regex(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/),
        mobileNumber:Joi.string().regex(/^01[0-2,5]{1}[0-9]{8}$/).required(),
        role:Joi.string().valid('user','company_HR')
    })
}
//we can add cpassword and check on it by ref and i suggest that to make user ensure his password but i leave it because it isn't part of collection
//we can add .with('email','password')but in all casses both of them are reqired


export const signinschema={
    body:Joi.object({
        email:Joi.string().email(),
        mobileNumber:Joi.string().regex(/^01[0-2,5]{1}[0-9]{8}$/),
        password:Joi.string().required().min(4).max(10)
    }).without('email', 'mobile')
}

export const updateschema={
    body:Joi.object({
        firstName:Joi.string().min(3).max(10).alphanum(),
        lastName:Joi.string().min(3).max(10).alphanum(),
        email:Joi.string().email(),
        recoveryEmail:Joi.string().email(),
        DOB:Joi.string().regex(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/),
        mobileNumber:Joi.string().regex(/^01[0-2,5]{1}[0-9]{8}$/)
    })
}