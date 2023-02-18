const { object } = require('joi')
const { noteModel } = require('../models/note')


const createNotes = async( object ) => {
    return noteModel.create( object )
}

const getaNote = async( object ) => {
    return noteModel.findOne( object )
}

const getallNotes = async( object ) => {
    return noteModel
        .find( object.query )
        .sort( object.sort )
        .skip( object.skip )
        .limit( object.limit )
}

const deleteaNote = async( object ) => {
    return noteModel.findByIdAndDelete( object )
}

const updateaNote = async( id, object, options ) => {
    return noteModel.findByIdAndUpdate( id, object, options )
}


module.exports = { createNotes, getaNote, getallNotes, deleteaNote, updateaNote }