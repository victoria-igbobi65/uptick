const winston = require('winston')
const CONFIG = require('../../config/config')

const logger = CONFIG.NODE_ENV === 'test'
    ? winston.createLogger({ silent: true })
    : winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    })

module.exports = { logger }