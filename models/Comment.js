const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: 'Comment is required',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: 'Post is required field',
  },
  subcomments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubComment' }],
})

module.exports = mongoose.model('Comment', CommentSchema)
