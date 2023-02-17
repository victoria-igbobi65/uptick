const express = require('express')

//const { notesDto, updateDto } = require('../dtos/notes')
const { validateUser } = require('../middlewares/authenticate.user')
const { protect } = require('../middlewares/validate.notes')
const { newNotes, getMyNotes, getNote, deleteNote, updateNote } = require('../controllers/note')
const noteRouter = express.Router();

noteRouter
    .route('/')
    .post( validateUser, newNotes )
    .get( validateUser, getMyNotes )

noteRouter
    .route('/:id')
    .get( validateUser, protect, getNote)
    .delete( validateUser, protect, deleteNote )
    .patch( validateUser, protect, updateNote )

module.exports = { noteRouter }