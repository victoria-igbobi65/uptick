/* Module Imports */
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')
const { userRouter } = require('./routes/user')
const { noteRouter } = require('./routes/notes')
const { AppError } = require('./errors/AppError')
const globalErrorhandler = require('./errors/errorHandler')
const app = express()

/* MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(cors()) /* allow requests from all origins */
app.use(helmet())
app.use(xss()) /* sanitixe user input*/
app.use( mongoSanitize()) /* sanitize user input to prevent DB operator injection*/
// app.use(
//     rateLimit({
//         windowMs: 12 * 60 * 60 * 1000,
//         max: 5,
//         message: 'You exceeded 100 request in 12 hours!',
//         headers: true,
//     })
// )

/* set api info response*/
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Visit the following link(s) for details about usage',
        link: 'https://github.com/victoria-igbobi65/uptick#usage',
        readme: 'https://github.com/victoria-igbobi65/uptick#readme',
    })
})

app.use('/api/v1/auth', userRouter)
app.use('/api/v1/note', noteRouter )


/* Error handler Middlewares */
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorhandler)

module.exports= { app }