require('dotenv').config();

const DBURL = process.env.NODE_ENV === 'test'? process.env.TEST_DBURL : process.env.DB_URL;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;
const APP_ENV = 'production';
const TREBLLE_KEY = process.env.TREBLLE_API_KEY;
const TREBLLE_PROJECT_ID = process.env.TREBLLE_PROJECT_ID;

module.exports={
    DBURL,
    PORT,
    SECRET,
    APP_ENV,
    NODE_ENV,
    TREBLLE_KEY,
    TREBLLE_PROJECT_ID
}