const mongoose = require('mongoose')

module.exports = (URI) => {

    mongoose.set('strictQuery', false)
    mongoose
        .connect(URI)
        .then(() => {
            console.log('Connection to MongoDB successful')
        })
        .catch((err) => {
            console.log('Connection to MongoDB failed', err.message)
        })
}
