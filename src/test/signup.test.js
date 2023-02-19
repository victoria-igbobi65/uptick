const request = require('supertest')
const { app } = require('../app')
const mongoose = require('mongoose')
const CONFIG = require('../config/config')
require('dotenv').config()

describe('User registration', () => {
    beforeAll(async () => {
        await mongoose.connect(CONFIG.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    beforeEach(async () => {
        await mongoose.connection.db.dropDatabase()
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
})
