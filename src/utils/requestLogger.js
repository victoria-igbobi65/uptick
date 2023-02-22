const winston = require('winston')
const path = require('path')
const morgan = require('morgan')
const CONFIG = require('../../config/config')



// Define a logger with both console and file transports
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../', '../logs/all.log'),
            level: 'http',
        })
    ],
})


const requestLoggerMiddleware = CONFIG.NODE_ENV === CONFIG.APP_ENV? morgan('combined', {
    stream: { write: (message) => logger.info(message) }}): morgan('dev')

module.exports = requestLoggerMiddleware;