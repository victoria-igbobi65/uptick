const request = require('supertest')
const mongoose = require('mongoose')
const { app } = require('../app')
const HELPER = require('./testhelper')
const { userModel } = require('../src/models/user')
const { noteModel } = require('../src/models/note')


describe("Update Note", () => {
    let authToken, id;

    beforeAll(async () => {
        await userModel.deleteMany({})
        await noteModel.deleteMany({})

        await request(app).post('/api/v1/auth/signup').send(HELPER.user)

        const loginResponse = await request(app)
            .post('/api/v1/auth/login')
            .send(HELPER.user)
        authToken = loginResponse.headers['set-cookie'][0].split(';')[0]

        const newPost = await request(app)
            .post('/api/v1/note')
            .send(HELPER.note)
            .set('Cookie', authToken)
        id = newPost.body.newNotes._id
    })

    afterAll(async () => {
        mongoose.connection.close()
    })

    test('returns a 200 if update successful', async() => {
        const note = {
            body: "Hear the ocean and the earth"
        }

        const response = await request( app )
            .patch(`/api/v1/note/${ id }`)
            .set('Cookie', authToken)
            .send( note )
        expect( response.statusCode ).toBe( 200 )
        expect( response.body.status).toBe( true )
        expect(response.body.updatedNote.title).toBe('Fall of the Ocean')
        expect( response.body.updatedNote.body ).toBe('Hear the ocean and the earth')
        
    })
    
    test('return 401 error if token not provided', async() =>{

        const note = {
            body: 'Hear the ocean and the earth',
        }

        const response = await request(app)
            .patch(`/api/v1/note/${id}`)
            .send(note)
        expect( response.statusCode ).toBe( 401 )
        expect( response.body.status ).toBe('fail')
        expect( response.body.message ).toBe('You are not logged in!')

    })

    test('return 404 error if note id not found or note id doesn\'t belong to user', async () => {
        const note = {
            body: 'Hear the ocean and the earth',
        }

        const response = await request(app)
            .patch(`/api/v1/note/${ HELPER.invalidId }`)
            .set('Cookie', authToken)
            .send(note)
        expect( response.statusCode ).toBe( 404 )
        expect( response.body.status ).toBe('fail')
        expect( response.body.message ).toBe('note with ID: 63f5022ff0b2c6f5c4cf5fb9 not found')
 
    })

})