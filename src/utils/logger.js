const winston = require('winston')
const path = require('path')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    (info) => `${info.timestamp} ${info.message}`
                )
            ),
            silent: process.env.NODE_ENV === 'test' ? true : false,
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../', '../logs/error.log'),
            level: 'error',
        }),
        
    ],
})

module.exports = { logger }
