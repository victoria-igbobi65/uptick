const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../errors/catchAsync')
const { createNotes, getallNotes, getaNote, deleteaNote, updateaNote } = require('../services/notes');
const { AppError } = require('../errors/AppError');
const { buildQuery, trimString } = require('../helper')


const newNotes = catchAsync( async( req, res ) => {

    const { title, body } = trimString( {...req.body} );
    const owner = req.user;
    
    const newNotes = await createNotes( { title: title, body: body, owner: owner } )

    res.status( StatusCodes.CREATED ).json({
        msg: "Notes created successfully!",
        newNotes
    })

})

const getMyNotes = catchAsync( async( req, res ) => {

    const owner = req.user;
    const query = buildQuery(owner, { ...req.query })
    const notes = await getallNotes( query )

    res.status( StatusCodes.OK ).json({
        status: true,
        hhbits: notes.length,
        notes
    })
})


const getNote = catchAsync( async( req, res) => {
    const noteId = req.params.id

    const note = await getaNote({ owner: req.user, _id: noteId })
    res.status(StatusCodes.OK).json({
        status: true,
        note,
    })
})


const deleteNote = catchAsync( async( req, res ) => {

    const noteId = req.params.id;
    await deleteaNote( { _id: noteId, owner: req.user } )

    res.status( StatusCodes.NO_CONTENT ).json({
        status: true,
        msg: null
    })

})


const updateNote = catchAsync( async( req, res ) => {

    const noteId = req.params.id;
    const { title, body } = req.body;

    const updatedNote = await updateaNote(
        noteId,
        { $set: { title, body } },
        { new: true, runValidators: true }
    )

    res.status( StatusCodes.OK ).json({
        status: true,
        updatedNote
    })

})

module.exports= { newNotes, getMyNotes, getNote, deleteNote, updateNote }