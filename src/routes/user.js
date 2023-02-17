const express = require('express')

const { registration, login } = require('../controllers/auth')
const { signupDto, loginDto } = require('../dtos/user')
const userRouter = express.Router();

userRouter
    .route('/signup')
    .post( signupDto, registration)

userRouter
    .route('/login')
    .post( loginDto, login )

module.exports= { userRouter };