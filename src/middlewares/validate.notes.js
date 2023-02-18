const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync");
const { getaNote } = require("../services/notes");

const protect = catchAsync( async( req, res, next ) => {
    const noteId = req.params.id;
    const owner = req.user;
    const found = await getaNote({ owner: owner, _id: noteId })

    if (!found){
        throw new AppError(`note with ID: ${noteId} not found`, StatusCodes.NOT_FOUND )
    }
    next();

})

module.exports= { protect }