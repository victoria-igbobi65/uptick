var { app } = require("./app");
var { logger } = require('./src/utils/logger')
var CONFIG = require('./config/config')
var PORT = CONFIG.PORT || 3000;

/* starting server */
var server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${ PORT }`);
});


//HANDLING UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
    logger.info('Unhandled Rejection! ...Shutting down....')
    server.close(() => {
        process.exit(1);
    }); 
})
