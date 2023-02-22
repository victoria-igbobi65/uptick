var { app } = require("./app");
var { logger } = require('./src/utils/logger')
var CONFIG = require('./config/config')
var PORT = CONFIG.PORT || 3000;

/*Uncaught exception*/
process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCEPTION! ...Shutting down....')
    logger.error(`Error: ${ err.message }`)
    process.exit(1)
})


var server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${ PORT }`);
});


//HANDLING UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
    logger.error('Unhandled Rejection! ...Shutting down....')
    logger.error(`Error: ${ err}`)
    server.close(() => {
        process.exit(1);
    }); 
})
