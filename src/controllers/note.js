const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../errors/catchAsync')
const { createNotes } = require('../services/notes')


const newNotes = catchAsync( async( req, res ) => {

    const { title, body } = req.body;
    const owner = req.user;

    const newNotes = await createNotes( { title: title, body: body, owner: owner } )

    res.status( StatusCodes.OK ).json({
        msg: "Notes created successfully!",
        newNotes
    })

})

module.exports= { newNotes }