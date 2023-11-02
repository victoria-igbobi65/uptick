const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const CONFIG = require('../../config/config')


const signToken = ( id ) => {
    return jwt.sign({ id }, CONFIG.SECRET )
}

const setCookies = ( res, tokenName, token ) => {

    return res.cookie(tokenName, token, {
        httpOnly: true,
        secure: CONFIG.APP_ENV,
    })
}

const decodeToken = async (token) => {
    return promisify( jwt.verify )( token, CONFIG.SECRET )
}

const buildQuery = ( owner, object ) =>{
    
    let query = { owner: owner };
    const sortBy = object.sort? object.sort.split(',').join(' '): '-createdAt'
    const page = +object.page || 1; 
    const limit = +object.limit || 10;
    const skip = (page - 1) * limit

    if (object.q){
        query.$or = [
            { title: { $regex: object.q, $options: 'i' } }, // check if search word matches in field1
            { body: { $regex: object.q, $options: 'i' } }, // check if search word matches in field2
        ]
    }
    
    return { query, sortBy, limit, skip }
} 

const trimString = ( object ) => {
    const query = {}
    if ( object.title){
        query.title = object.title.trim()
    }
    if ( object.body ){
        query.body = object.body.trim()
    }
    return query;
}

module.exports={ signToken, setCookies, decodeToken, buildQuery, trimString }