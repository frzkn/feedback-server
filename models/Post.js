const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

module.exports = mongoose.model('Post', PostSchema)
