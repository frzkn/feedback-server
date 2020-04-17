require('dotenv').config()

const Strategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
// const mongoose = require('mongoose')
const User = require('./models/User')

const SECRET = process.env.JWT_SECRET || 'example'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
}

module.exports = (passport) => {
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.username,
            })
          } else return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
