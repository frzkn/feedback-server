const router = require('express').Router()
const SubComment = require('../models/SubComment')
const Comment = require('../models/Comment')
const passport = require('passport')

router.post('/subcomment', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { content, comment } = req.body
  let commentDocument
  try {
    commentDocument = await Comment.findById(comment)
  } catch (e) {
    return res.status(400).json(e.message)
  }

  if (commentDocument) {
    let subComment
    try {
      subComment = await new SubComment({ username: req.user.name, content, comment })
      commentDocument.subcomments.push(subComment._id)
      commentDocument.save()
      subComment.save()
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }

    return res.status(200).json({ subComment })
  }
})

module.exports = router
