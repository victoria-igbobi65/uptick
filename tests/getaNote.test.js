const request = require('supertest')
const mongoose = require('mongoose')
const { app } = require('../app')
const HELPER = require('./testhelper')
const { userModel } = require('../src/models/user')
const { noteModel } = require('../src/models/note')


describe("GET a note", () => {
    let authToken;
    let id;

    beforeAll( async() => {

        await userModel.deleteMany({})
        await noteModel.deleteMany({})

        /*signup*/
        await request(app).post('/api/v1/auth/signup').send( HELPER.user )

        /* login user*/
        const loginResponse = await request(app)
            .post('/api/v1/auth/login')
            .send( HELPER.user )
        authToken = loginResponse.headers['set-cookie'][0].split(';')[0]

        /* save a new note to db*/
        const newPost = await request( app )
            .post('/api/v1/note')
            .send( HELPER.note )
            .set('Cookie', authToken)
        id = newPost.body.newNotes._id;
      
    })

    afterAll(async () => {
        mongoose.connection.close()
    })

    test('returns 200 when a correct note id is passed', async() => {
        const response = await request(app)
            .get(`/api/v1/note/${id}`)
            .set('Cookie', authToken)
        expect( response.statusCode ).toBe( 200 )
        expect( response.body.status).toBe( true )
        expect( response.body.note ).toHaveProperty('title')
        expect( response.body.note ).toHaveProperty('body')
        expect( response.body.note ).toHaveProperty('owner')
        
    })

    test('returns 404 error if note requested doesn\'t belong to user or isn\'t found', async() => {
        
        const response = await request(app)
            .get(`/api/v1/note/${HELPER.invalidId}`)
            .set('Cookie', authToken)
        expect( response.statusCode ).toBe( 404 )
        expect( response.body.status ).toBe('fail')
        expect( response.body.message ).toBe('note with ID: 63f5022ff0b2c6f5c4cf5fb9 not found')

    })

    test('returns a 401 error if token not provided', async() => {

        const response = await request( app )
            .get(`/api/v1/note/${ HELPER.invalidId }`)
        expect(response.statusCode).toBe( 401 )
        expect( response.body.status ).toBe('fail')
        expect(response.body.message).toBe('You are not logged in!')

    })
})