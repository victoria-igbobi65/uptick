const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../errors/catchAsync')
const { createNotes, getallNotes, getaNote } = require('../services/notes');
const { AppError } = require('../errors/AppError');
const { verifyNoteState } = require('../helper')


const newNotes = catchAsync( async( req, res ) => {

    const { title, body } = req.body;
    const owner = req.user;

    if ( verifyNoteState( req.body ) ){
        throw new AppError( 'Empty note not saved!', StatusCodes.BAD_REQUEST )
    }
    const newNotes = await createNotes( { title: title.trim(), body: body.trim(), owner: owner } )

    res.status( StatusCodes.OK ).json({
        msg: "Notes created successfully!",
        newNotes
    })

})

const getMyNotes = catchAsync( async( req, res ) => {

    const owner = req.user;
    const notes = await getallNotes( { owner: owner})

    res.status( StatusCodes.OK ).json({
        status: true,
        notes
    })
})

const getNote = catchAsync( async( req, res) => {
    const noteId = req.params.id;

    const note = await getaNote({ owner: req.user, _id: noteId })
    res.status( StatusCodes.OK ).json({
        status: true,
        note
    })
})

module.exports= { newNotes, getMyNotes, getNote }