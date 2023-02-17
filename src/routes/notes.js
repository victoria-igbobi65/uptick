const express = require('express')

const { notesDto } = require('../dtos/notes')
const { validateUser } = require('../middlewares/authenticate.user')
const { newNotes } = require('../controllers/note')
const noteRouter = express.Router();

noteRouter
    .route('/')
    .post( validateUser, notesDto, newNotes )


module.exports = { noteRouter }