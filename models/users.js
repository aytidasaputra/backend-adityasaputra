const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true
  },
  accountNumber: {
    type: Number,
    required: true
  },
  emailAddress: {
    type: mongoose.SchemaTypes.Email
  },
  identityNumber: {
    type: Number,
    required: [true, 'User identity number required']
  },
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}


module.exports = mongoose.model('Users', userSchema)