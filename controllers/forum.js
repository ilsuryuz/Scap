// ** Dependencies **
const express = require('express');
const forumRouter = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

// ** I **
forumRouter.get('/post', (req, res) => {
    Post.find({}, (err, foundPosts) => {
        res.render('forum/index.ejs', {
            posts: foundPosts,
        })
    })
})
// ** N **

// ** D **

// ** U **

// ** C **

// ** E **

// ** S **

// ** Export Sessions Router **
module.exports = forumRouter;