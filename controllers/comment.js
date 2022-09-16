// ** Dependencies **
const express = require('express');
const commentRouter = express.Router();
require('dotenv').config();

const Thread = require('../models/thread');
const Comment = require('../models/comment');


// ** N **
commentRouter.get('/:thread/new-comment', (req, res) => {
    Thread.findById(req.params.thread, (err, foundThread) => {
        res.render('comment/new-comment.ejs', 
        {
            threadID: req.params.thread,
            threadName: foundThread.name,
        })
    })
    
})
// ** D **
commentRouter.delete("/:id", (req, res) => {
    Category.findByIdAndDelete(req.params.id, (err, deletedCategory) => {
        res.redirect('/category')
    })
})
// ** U **
commentRouter.put('/:id/', (req, res) => {
    Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (err, updatedCategory) => {
            res.redirect('/category/'+ req.params.id)
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
            res.redirect('back')
        })
    })
})
// ** E **
commentRouter.get('/:id/edit', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        res.render('category/edit.ejs', {
            category: foundCategory,
        })
    })
})
// ** S **
commentRouter.get('/:id', (req, res) => {
    Thread.findById(req.params.id).populate('creator').exec(function (err, foundThread) {

        res.render('thread/show-thread.ejs', {
            thread: foundThread,
            currentUser: req.session.currentUser,
        })
    })
})
// ** Export Sessions Router **
module.exports = commentRouter;