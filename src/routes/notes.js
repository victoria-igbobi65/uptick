const express = require('express')

const { notesDto } = require('../dtos/notes')
const { validateUser } = require('../middlewares/authenticate.user')
const { protect } = require('../middlewares/validate.notes')
const { newNotes, getMyNotes, getNote } = require('../controllers/note')
const noteRouter = express.Router();

noteRouter
    .route('/')
    .post( validateUser, newNotes )
    .get( validateUser, getMyNotes )

noteRouter
    .route('/:id')
    .get( validateUser, protect, getNote)

module.exports = { noteRouter }