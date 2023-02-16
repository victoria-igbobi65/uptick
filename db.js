var mongoose = require("mongoose");
var { app } = require("./app");
require("dotenv").config();

var port = process.env.PORT || 3000;
var dbURl = process.env.DB_URL;

mongoose.set("strictQuery", false);
mongoose
    .connect(dbURl, { useNewUrlParser: true })
    .then(() => console.log("DB connection Successful!"));

var server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



//HANDLING UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! ...Shutting down....')
    server.close(() => {
        process.exit(1);
    }); 
})
