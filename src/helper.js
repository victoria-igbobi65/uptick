const jwt = require('jsonwebtoken')
const { promisify } = require('util')
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

const decodeToken = async (token) => {
    return promisify(jwt.verify)(token, process.env.SECRET_KEY)
}

const verifyNoteState = ( object ) => {

    let title = false 
    let body = false
    
    if ( object.title){
        title = object.title.trim().length
    }
    if( object.body){
        body= object.body.trim().length;
    }
    if ( !object.title && ! object.body ){
        return true;
    }
    else if ( title === 0 && !body){
        return true;
    }
    else if (body === 0 && !title){
        return true;
    }
    else if (title === 0 && body === 0){
        return true;
    }
    else {
        return false;
    }

}

const buildQuery = ( owner, object ) =>{
    let query = { owner: owner };
    let sortBy

    if (object.q){
        query.$or = [
            { title: { $regex: object.q, $options: 'i' } }, // check if search word matches in field1
            { body: { $regex: object.q, $options: 'i' } }, // check if search word matches in field2
        ]
    }
    if (object.sort) {
        sortBy = object.sort.split(',').join(' ')
    } else {
        sortBy = '-createdAt'
    }
    
    return { query, sortBy }
} 

module.exports={ signToken, setCookies, decodeToken, verifyNoteState, buildQuery }