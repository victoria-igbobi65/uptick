var { app } = require("../app");
const { logger } = require('../src/utils/logger')
var CONFIG = require('./config')
var PORT = CONFIG.PORT || 3000;


var server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${ PORT }`);
});


//HANDLING UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
    logger.info('Unhandled Rejection! ...Shutting down....')
    logger.error(`Error: ${ err.message}`)
    server.close(() => {
        process.exit(1);
    }); 
})
