const { object } = require('joi')
const { noteModel } = require('../models/note')


const createNotes = async( object ) => {
    return noteModel.create( object )
}

const getaNote = async( object ) => {
    return noteModel.findOne( object )
}

const getallNotes = async( object, sort ) => {
    return noteModel.find( object ).sort( sort )
}

const deleteaNote = async( object ) => {
    return noteModel.findByIdAndDelete( object )
}

const updateaNote = async( id, object, options ) => {
    return noteModel.findByIdAndUpdate( id, object, options )
}


module.exports = { createNotes, getaNote, getallNotes, deleteaNote, updateaNote }