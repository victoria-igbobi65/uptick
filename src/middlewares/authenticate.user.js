const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../errors/AppError');
const catchAsync = require('../errors/catchAsync')
const { decodeToken } = require('../helper')

const validateUser = catchAsync( async( req, res, next ) =>{ 

    const token = req.cookies.jwt_token;
    if (!token){
        throw new AppError('You are not logged in!', StatusCodes.UNAUTHORIZED )
    }
    
    const userId = (await decodeToken(token)).id;
    if (!userId) {
        throw new AppError('Invalid token!', StatusCodes.UNAUTHORIZED )
    }

    req.user = userId
    next()

}) 

module.exports = { validateUser }