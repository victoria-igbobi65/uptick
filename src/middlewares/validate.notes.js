const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync");
const { getaNote } = require("../services/notes");
const { trimString } = require('../utils/helper')

const protect = catchAsync( async( req, res, next ) => {
    const noteId = req.params.id;
    const owner = req.user;
    const found = await getaNote({ owner: owner, _id: noteId })

    if (!found){
        throw new AppError(`note with ID: ${noteId} not found`, StatusCodes.NOT_FOUND )
    }
    next();

})

const validatenote = catchAsync( async( req, res, next ) => {

    const { title, body } = trimString({ ...req.body })

    /* check if title and body was passed in the request body*/
    if ( !req.body.hasOwnProperty('title') && ! req.body.hasOwnProperty('body') ) {
        throw new AppError('Title or body not provided!', StatusCodes.BAD_REQUEST)
    }

    /* check if body and title is empty */
    else if ( !title && !body ) {
        throw new AppError('Empty note not saved!', StatusCodes.BAD_REQUEST)
    }
    next();
})

module.exports= { protect, validatenote }