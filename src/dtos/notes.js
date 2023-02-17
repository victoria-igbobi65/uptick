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

const noteSchema = joi.object().keys({
    title: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .error(new Error('Title must be between 1 and 100 characters')),

    body: joi
        .string()
        .min(1)
        .error(new Error('Notes content is required')),
})

const loginSchema = joi.object().keys({
    email: joi
        .string()
        .email()
        .required()
        .error(new Error('Provide valid email address')),
    password: joi
        .string()
        .min(8)
        .required()
        .error(new Error('Password must be at least 8 characters')),
})

const notesDto = validateBody( noteSchema )
const loginDto = validateBody(loginSchema)

module.exports = {
    notesDto,
    loginDto,
}
