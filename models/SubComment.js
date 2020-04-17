const mongoose = require('mongoose')

const SubCommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: 'Comment is required',
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: 'Post is required field',
  },
})

module.exports = mongoose.model('SubComment', SubCommentSchema)
