const { StatusCodes } = require('http-status-codes')

const { getaUser, createUser } = require('../services/user')
const { AppError } = require('../errors/AppError')
const { signToken, setCookies } = require('../utils/helper')
const catchAsync = require('../errors/catchAsync')


const registration = catchAsync( async( req, res ) => {

    const { email, password } = req.body;
    const found = await getaUser({ email: email })

    if (found){
        throw new AppError( 'user with this email already exists', StatusCodes.CONFLICT )
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
        throw new AppError( 'email or password incorrect!', StatusCodes.BAD_REQUEST )
    }
    const token = signToken( user._id)
    setCookies(res, 'jwt_token', token)

    res.status( StatusCodes.OK ).json({
        msg: "Login successful!"
    })

})

module.exports={ registration, login }