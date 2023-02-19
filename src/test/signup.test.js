const request = require('supertest')
const { app } = require('../app')
const { userModel } = require('../models/user')
const mongoose = require('mongoose')


describe('User registration', () => {
    beforeAll(async () => {
        await userModel.deleteMany({})
     })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    beforeEach(async () => {
        await userModel.deleteMany({})
    })

    test('should register a new user', async () => {
        const user = {
            email: 'johndoe@example.com',
            password: 'password123',
        }
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send(user)
        expect(response.statusCode).toBe(201)
        expect(response.body.newUser).toHaveProperty('_id')
        expect(response.body.newUser).toHaveProperty('email', user.email)
    })

    test('should return a 400 error with invalid email', async() => {
        const user = {
            email: '@example.com',
            password: 'pass',
        }
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send(user)
        expect(response.statusCode).toBe(400)
        expect( JSON.parse(response.text).message).toBe('Provide a valid email address')

    })

    test('should return a 400 error with a weak password', async () => {
        const user = {
            email: 'user@example.com',
            password: 'pass',
        }
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send(user)
        expect(response.statusCode).toBe(400)
        expect(JSON.parse(response.text).message).toBe('Password must be at least 8 characters')
    })
})
