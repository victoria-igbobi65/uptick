const express = require('express')
const logger = require('morgan')
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

app.use('/auth', userRouter)
app.use('/notes', noteRouter )


app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorhandler)

module.exports= { app }