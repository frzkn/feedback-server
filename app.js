require('dotenv').config()
var express = require('express')
var path = require('path')
const createError = require('create-error')
var logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

var authRouter = require('./routes/auth')
var postRouter = require('./routes/post')
var commentRouter = require('./routes/comment')
var subCommentRouter = require('./routes/subcomment')
const cors = require('cors')

var app = express()

//TODO: setup cors to * for now
app.use(cors())

let dbUser = process.env.MONGO_USER
let dbPass = process.env.MONGO_PASS

const URI = `mongodb+srv://${dbUser}:${dbPass}@faraz-fhmrn.mongodb.net/feedback-system?retryWrites=true&w=majority`
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Error connecting to MongoDB ${err}`))
mongoose.set('useCreateIndex', true)

app.use(passport.initialize())
require('./passport.config')(passport)

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/', authRouter)
app.use('/api/', postRouter)
app.use('/api/', commentRouter)
app.use('/api/', subCommentRouter)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  return res.status(404).json(err)
})

module.exports = app
