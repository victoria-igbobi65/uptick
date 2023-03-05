const request = require('supertest')
const mongoose = require('mongoose')
const HELPER = require('./testhelper')
const { app } = require('../app')
const { userModel } = require('../src/models/user')
const { noteModel } = require('../src/models/note')

describe('Create new note', () => {
    let authToken;

    beforeAll(async (  ) => {

        await userModel.deleteMany({})
        await noteModel.deleteMany({})

        await request(app).post('/api/v1/auth/signup').send( HELPER.user )
      
        const loginResponse = await request(app).post('/api/v1/auth/login').send( HELPER.user )
        authToken = loginResponse.headers['set-cookie'][0].split(';')[0]
        
    })

    afterAll( async() => {
        mongoose.connection.close();
    })

    test('returns a 201 if new note was created successfully', async () => {
       
        const response = await request(app)
            .post('/api/v1/note')
            .set("Cookie", authToken)
            .send( HELPER.note )
        expect( response.statusCode ).toBe( 201 )
        expect( response.body.newNotes ).toHaveProperty('title')
        expect(response.body.newNotes.title).toBe('Fall of the Ocean')
        expect( response.body.msg).toBe( 'Notes created successfully!')
    })

    test('should return a 401 error if cookie not provided', async() => {

        const response = await request( app )
            .post('/api/v1/note')
            .send( HELPER.note )
        expect( response.statusCode ).toBe(401)
        expect( JSON.parse(response.text).status ).toBe('fail')
        expect( JSON.parse(response.text).message ).toBe('You are not logged in!')

    })

    test('should return a 400 error when no data is passed', async() => {

        const response = await request(app)
            .post('/api/v1/note')
            .set('Cookie', authToken)
            .send({})
        expect( response.statusCode ).toBe(400)
        expect( response.body ).toHaveProperty('status')
        expect( response.body ).toHaveProperty('message')
        expect( response.body.status ).toBe('fail')
        expect(response.body.message).toBe('Title or body not provided!')

    })

    test('should return a 400 error when title and body is empty', async () => {

        const response = await request(app)
            .post('/api/v1/note')
            .set('Cookie', authToken)
            .send( HELPER.emptyNote )
        expect(response.statusCode).toBe(400)
        expect(JSON.parse(response.text).status).toBe('fail')
        expect(JSON.parse(response.text).message).toBe('Empty note not saved!')  
    })
})

