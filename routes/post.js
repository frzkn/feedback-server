const router = require('express').Router()
const Post = require('../models/Post')
const passport = require('passport')
// get all posts

router.get('/post', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const post = await Post.find({})
  if (post) return res.status(200).json(post)
  else return res.status(404).json({})
})

// create post
router.post('/post', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { title, content } = req.body
  const post = await new Post({ username: req.user.name, title, content })
  try {
    await post.save()
  } catch (e) {
    console.log(`Error ${e}`)
    return res.status(400).json(e)
  }
  return res.status(200).json(post)
})

// get one post with comments

router.get('/post/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let post = await Post.findById(req.params.id).populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'subcomments',
      model: 'SubComment',
      populate: { path: 'subcomments', model: 'SubComment' },
    },
  })

  if (post) return res.status(200).json(post)
  else return res.status(404).json({})
})

module.exports = router
