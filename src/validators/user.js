const joi = require('@hapi/joi')

const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)

        if (result.error) {
            return res.status(400).json({ message: result.error.message })
        }

        next()
    }
}

/* Registration Validator */
const registerSchema = joi.object().keys({
    
    email: joi
        .string()
        .email()
        .trim()
        .required()
        .error(new Error('Provide a valid email address')),
    
    password: joi
        .string()
        .min(8)
        .trim()
        .required()
        .error(new Error('Password must be at least 8 characters')),
})

/* Login validator */
const loginSchema = joi.object().keys({
    email: joi
        .string()
        .email()
        .trim()
        .required()
        .error(new Error('Provide valid email address')),
    password: joi
        .string()
        .min(8)
        .trim()
        .required()
        .error(new Error('Password must be at least 8 characters')),
})


const signupDto = validateBody(registerSchema)
const loginDto = validateBody(loginSchema)

module.exports = {
    signupDto,
    loginDto,
}
