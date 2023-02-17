const mongoose = require('mongoose')
const schema = mongoose.Schema;

const noteSchema = new schema({
    title: {
        type: String,
        required: true,

    },
    body: {
        type: String,

    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })

const noteModel = mongoose.model( 'note', noteSchema )
module.exports = { noteModel }