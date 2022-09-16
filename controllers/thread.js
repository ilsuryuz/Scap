// ** Dependencies **
const express = require('express');
const threadRouter = express.Router();
require('dotenv').config();

const Thread = require('../models/thread');
const Forum = require('../models/forum');
const Comment = require('../models/comment')

// ** N **
threadRouter.get('/:forum/new-thread', (req, res) => {
    res.render('thread/new-thread.ejs', 
    {forumID: req.params.forum,
        forumOrigin: req.query.forum,
    })
})
// ** D **
threadRouter.delete("/:id", (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (err, deletedCategory) => {
        res.redirect('/category')
    })
})
// ** U **
threadRouter.put('/:id/', (req, res) => {
    Thread.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (err, updatedThread) => {
            res.redirect(`/thread/${req.params.id}`)
        }
    )
})
// ** C **
threadRouter.post('/:forum', (req, res) => {
    Thread.create(req.body, (err, createdThread) => {
        createdThread.creator = req.session.currentUser._id;
        createdThread.save()
        
        
        Forum.findById(req.params.forum, (err, foundForum) => {
            foundForum.threads.push(createdThread._id)
            foundForum.save()
            res.redirect(`/thread/${createdThread._id}`, {forumOrigin: f})
        })
    })
})
// ** E **
threadRouter.get('/:id/thread-edit', (req, res) => {
    Thread.findById(req.params.id, (err, foundThread) => {
        res.render('thread/edit-thread.ejs', {
            thread: foundThread,
        })
    })
})
// ** S **
threadRouter.get('/:id/', (req, res) => {
    Thread.findById(req.params.id).populate({path: 'creator'}).exec(function (err, foundThread) {
        let threadCreator = foundThread.creator
        Thread.findById(req.params.id).populate({path: 'comments', populate: [{path: 'creator'}]}).exec(function (err, foundThread) {
        res.render('thread/show-thread.ejs', {
            thread: foundThread,
            currentUser: req.session.currentUser,
            thCreator: threadCreator,
            forumOrigin: req.query.forum,
        })
    })
    })
})
// ** Export Sessions Router **
module.exports = threadRouter;