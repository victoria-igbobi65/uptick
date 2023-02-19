const request = require('supertest')
const { app } = require('../app')
const { userModel } = require('../models/user')
const mongoose = require('mongoose')


beforeAll(async () => {
    await userModel.deleteMany({})
    await userModel.create({
        email: 'user@gmail.com',
        password: 'password1234',
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

beforeEach(async () => {
    await userModel.deleteMany({})
})


describe( 'User Login', () => {
    test('returns a 200 if login is successful', async() =>{
        
    })
    
})