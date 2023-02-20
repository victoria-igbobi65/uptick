var { app } = require("./app");
var CONFIG = require('./config/config')
var PORT = CONFIG.PORT || 3000;

/* starting server */
var server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${ PORT }`);
});


//HANDLING UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! ...Shutting down....')
    server.close(() => {
        process.exit(1);
    }); 
})
