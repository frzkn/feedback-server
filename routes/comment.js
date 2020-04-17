const router = require('express').Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const passport = require('passport')
// create comment

router.post('/comment', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { content, post } = req.body
  const postDocument = await Post.findById(post)
  if (postDocument) {
    const comment = await new Comment({ username: req.user.name, content, post })
    postDocument.comments.push(comment)
    postDocument.save()
    try {
      comment.save()
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }

    return res.status(200).json({ comment })
  }
})

module.exports = router
