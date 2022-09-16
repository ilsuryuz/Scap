// ** Dependencies **
const express = require('express');
const commentRouter = express.Router();
require('dotenv').config();

const Thread = require('../models/thread');
const Comment = require('../models/comment');


// ** N **
commentRouter.get('/:thread/new-comment/', (req, res) => {
    Thread.findById(req.params.thread, (err, foundThread) => {
        res.render('comment/new-comment.ejs', 
        {
            threadID: req.params.thread,
            threadName: foundThread.name,
            forumOrigin: req.query.forum,
            tabTitle: "Add Comment"
        })
    })
    
})
// ** D **
commentRouter.delete("/:id", (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
        res.redirect(`/thread/${req.query.thread}/?forum=${req.query.forum}`)
    })
})
// ** U **
commentRouter.put('/:id/', (req, res) => {
    Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (err, updatedCategory) => {
            res.redirect('/')
        }
    )
})
// ** C **
commentRouter.post('/:comment', (req, res) => {
    Comment.create(req.body, (err, createdComment) => {
        createdComment.creator = req.session.currentUser._id;
        createdComment.save()
        
        Thread.findById(req.params.comment, (err, foundThread) => {
            foundThread.comments.push(createdComment._id)
            foundThread.save()
        })
        res.redirect(`/thread/${req.params.comment}/?forum=${req.query.forum}`)
    })
})
// ** E **
commentRouter.get('/:id/edit-comment', (req, res) => {
    Comment.findById(req.params.id, (err, foundComment) => {
        res.render('comment/edit-comment.ejs', {
            comment: foundComment,
            tabTitle: "Edit Comment"
        })
    })
})
// ** S **
commentRouter.get('/:id', (req, res) => {
    Thread.findById(req.params.id).populate('creator').exec(function (err, foundThread) {

        res.render('thread/show-thread.ejs', {
            thread: foundThread,
            currentUser: req.session.currentUser,
            tabTitle: foundThread.name
        })
    })
})
// ** Export Sessions Router **
module.exports = commentRouter;