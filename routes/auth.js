require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const passport = require('passport')

const SECRET = process.env.JWT_SECRET || 'example'

router.post('/register', async (req, res) => {
  let { username, email, password } = req.body
  let user = await User.find({ username })
  if (user.length !== 0) {
    return res.status(400).json({ message: 'User already exist please log in' })
  } else {
    let newUser = new User({ username, email, password })
    try {
      newUser.save()
    } catch (e) {
      return res.status(400).json(e)
    }
    return res.status(200).json({ newUser })
  }
})

router.post('/login', async (req, res) => {
  let errs = {}
  let { username, password } = req.body
  const user = await User.findOne({ username }).select('+password')
  if (!user) {
    errs.message = 'Account not found'
    return res.status(400).json(errs)
  }
  let isValidated = await bcrypt.compare(password, user.password)
  if (!isValidated) {
    errs.message = 'Password is incorrect'
    return res.status(400).json(errs)
  }
  const jwtPayload = {
    id: user._id,
    username: user.username,
  }
  let token = await jwt.sign(jwtPayload, SECRET, { expiresIn: 36000 })
  if (!token) {
    return res.status(500).json({ error: 'Error signing token' })
  } else {
    return res.json({
      success: true,
      token: `Bearer ${token}`,
    })
  }
})

// router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   const { username } = req.user
//   const dbUser = await User.findOne({ username })
//   res.status(200).json(dbUser)
// })

module.exports = router
