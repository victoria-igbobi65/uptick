const { object } = require('joi')
const { noteModel } = require('../models/note')


const createNotes = async( object ) => {
    return noteModel.create( object )
}

const getaNote = async( object ) => {
    return noteModel.findOne( object )
}

const getallNotes = async( object ) => {
    return noteModel.find( object )
}

const deleteaNote = async( object ) => {
    return noteModel.findByIdAndDelete( object )
}


module.exports = { createNotes, getaNote, getallNotes, deleteaNote }