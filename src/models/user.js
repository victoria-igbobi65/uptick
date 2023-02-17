const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema = mongoose.Schema;

const userSchema = new schema({

    email: {
        type: String,
        required: [ true, 'Emal is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password is required!'],
        minLength: 8,
        select: false
    }
})

userSchema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
   
})

userSchema.methods.correctPassword = async (
    candidatePassword,
    userPassword
) => {
    return await bcrypt.compare(candidatePassword, userPassword)
} 

const userModel = mongoose.model('user', userSchema )
module.exports = { userModel };