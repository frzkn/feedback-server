const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function (next) {
  let user = this
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash
      next()
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
})

module.exports = mongoose.model('User', UserSchema)
