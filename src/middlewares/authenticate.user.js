const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../errors/AppError');
const catchAsync = require('../errors/catchAsync')
const HELPER = require('../helper')

const validateUser = catchAsync( async( req, res, next ) =>{ 

    const token = req.cookies.jwt_token;
    if (!token){
        throw new AppError('You are not logged in!', StatusCodes.FORBIDDEN )
    }

    const userId = (await HELPER.decodeToken(token)).id;
    if (!userId) {
        throw new AppError('Invalid token!', StatusCodes.FORBIDDEN)
    }

    req.user = userId
    next()

}) 

module.exports = { validateUser }