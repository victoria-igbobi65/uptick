require('dotenv').config();

const DBURL = process.env.NODE_ENV === 'test'? process.env.TEST_DBURL : process.env.DB_URL;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET_KEY;
const APP_ENV = 'production';

module.exports={
    DBURL,
    PORT,
    SECRET,
    APP_ENV
}