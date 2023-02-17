const jwt = require('jsonwebtoken')
const CONSTANTS = require('./constants/ts')
require('dotenv').config()

const signToken = ( id ) => {
    return jwt.sign({ id }, process.env.SECRET_KEY)
}

const setCookies = ( res, tokenName, token ) => {

    return res.cookie(tokenName, token, {
        httpOnly: true,
        secure: CONSTANTS.APP_ENV.PRODUCTION,
    })
}

module.exports={ signToken, setCookies }