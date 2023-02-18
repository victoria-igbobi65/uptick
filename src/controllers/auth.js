const { StatusCodes } = require('http-status-codes')

const { getaUser, createUser } = require('../services/user')
const { AppError } = require('../errors/AppError')
const { signToken, setCookies } = require('../helper')
const CONSTANTS = require('../constants/ts')
const catchAsync = require('../errors/catchAsync')


const registration = catchAsync( async( req, res ) => {

    const { email, password } = req.body;
    const found = await getaUser({ email: email })

    if (found){
        throw new AppError( CONSTANTS.MESSAGE.ERROR.ALREADY_EXISTS, StatusCodes.CONFLICT )
    }
    const newUser = await createUser({ email, password })
    newUser.password = undefined;

    res.status( StatusCodes.CREATED ).json({
        msg: "signup successful!",
        newUser
    })
})

const login = catchAsync( async( req, res ) => {

    const { email, password } = req.body;
    const user = await getaUser({ email: email })

    if ( !user || !( await user.correctPassword(password, user.password ))){
        throw new AppError( CONSTANTS.MESSAGE.ERROR.LOGIN, StatusCodes.BAD_REQUEST )
    }
    const token = signToken( user._id)
    setCookies(res, CONSTANTS.TOKEN.NAME, token)

    res.status( StatusCodes.OK ).json({
        msg: "Login successful!"
    })

})

module.exports={ registration, login }