/* Module Imports */
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
//const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')
const { userRouter } = require('./src/routes/user')
const { noteRouter } = require('./src/routes/notes')
const globalErrorhandler = require('./src/errors/errorHandler')
const unknownEndpoint = require('./src/middlewares/unknownEndoint')
const rootRouter = require('./src/controllers/root')
const CONFIG = require('./config/config')
require('./config/db')( CONFIG.DBURL )
const app = express()


/* MIDDLEWARES */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors()) /* allow requests from all origins */
app.use(helmet())
app.use(xss()) /* sanitixe user input*/
app.use( mongoSanitize()) /* sanitize user input to prevent DB operator injection*/
app.get('/', rootRouter)
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/note', noteRouter )
if ( CONFIG.NODE_ENV !== 'test'){
    app.use(logger('dev'))
}



/* Error handler Middlewares */
app.use('*', unknownEndpoint)
app.use(globalErrorhandler)

module.exports= { app }