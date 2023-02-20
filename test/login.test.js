const request = require('supertest')
const { app } = require('../app')
const { userModel } = require('../src/models/user')
const mongoose = require('mongoose')


beforeAll(async () => {
    await userModel.deleteMany({})
})

afterAll(async () => {
    await mongoose.connection.close()
})

beforeEach(async () => {
    await userModel.deleteMany({})
    await userModel.create({
        email: 'user@gmail.com',
        password: 'password1234',
    })
})


describe( 'User Login', () => {

    test('returns a 200 if login is successful', async() =>{
        const user = {
            email: 'user@gmail.com',
            password: 'password1234',
        }
        const response = await request( app )
            .post('/api/v1/auth/login')
            .send( user )
        expect( response.statusCode ).toBe( 200 )
        expect(JSON.parse( response.text ).msg ).toBe('Login successful!')
        
    })

    test('returns a 400 if incorrect details is provided', async () => {
        const user = {
            email: 'user@gmail.com',
            password: 'password123',
        }
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send(user)
        expect(response.statusCode).toBe(400)
        
        //expect(JSON.parse(response.text).message).toBe('email or password incorrect!')
    })
    
})