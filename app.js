/* Module Imports */
const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const { useTreblle } = require('treblle')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const { userRouter } = require('./src/routes/user')
const { noteRouter } = require('./src/routes/notes')
const { tMiddleware } = require('./src/middlewares/treblleMiddleware')
const { requestLoggerMiddleware } = require('./src/middlewares/requestLogger')
const unknownEndpoint = require('./src/middlewares/unknownEndoint')
const globalErrorhandler = require('./src/errors/errorHandler')
const rootRouter = require('./src/controllers/root')
const CONFIG = require('./config/config')
require('./config/db')( CONFIG.DBURL )
const app = express()


/* MIDDLEWARES */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
useTreblle( app, tMiddleware )
app.use(cookieParser())
app.use(cors()) /* allow requests from all origins */
app.use(helmet())
app.use(xss()) /* sanitize user input*/
app.use( mongoSanitize()) /* sanitize user input to prevent DB operator injection*/
app.use(requestLoggerMiddleware) /* middleware to log requests depending on the environment*/
app.get('/', rootRouter)
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/note', noteRouter )



/* Error handler Middlewares */
app.use('*', unknownEndpoint)
app.use(globalErrorhandler)

module.exports= { app }