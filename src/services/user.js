const { userModel } = require('../models/user')


const getaUser = async( object ) => {
    return userModel.findOne( object ).select('+password')

}

const createUser = async( object ) => {
    return userModel.create( object );
}

module.exports = { createUser, getaUser }