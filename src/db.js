var mongoose = require("mongoose");
var { app } = require("./app");
var CONFIG = require('./config/config')

/* Variable declarations */
var port = CONFIG.PORT || 3000;
var dbURl = CONFIG.DBURL;

mongoose.set("strictQuery", false);
mongoose
    .connect(dbURl, { useNewUrlParser: true })
    .then(() => console.log("DB connection Successful!"));


var server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



//HANDLING UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! ...Shutting down....')
    server.close(() => {
        process.exit(1);
    }); 
})
