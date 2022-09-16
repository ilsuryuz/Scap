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
    {forumID: req.params.forum})
})
// ** D **
threadRouter.delete("/:id", (req, res) => {
    Category.findByIdAndDelete(req.params.id, (err, deletedCategory) => {
        res.redirect('/category')
    })
})
// ** U **
threadRouter.put('/:id/', (req, res) => {
    Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (err, updatedCategory) => {
            res.redirect(`/category/${req.params.id}`)
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
        })
        res.redirect(`/thread/${createdThread._id}`)
    })
})
// ** E **
threadRouter.get('/:id/edit', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        res.render('category/edit.ejs', {
            category: foundCategory,
        })
    })
})
// ** S **
threadRouter.get('/:id', (req, res) => {
    Thread.findById(req.params.id).populate({path: 'creator'}).exec(function (err, foundThread) {
        let threadCreator = foundThread.creator
        Thread.findById(req.params.id).populate({path: 'comments', populate: [{path: 'creator'}]}).exec(function (err, foundThread) {
        res.render('thread/show-thread.ejs', {
            thread: foundThread,
            currentUser: req.session.currentUser,
            thCreator: threadCreator
        })
    })
    })
})
// ** Export Sessions Router **
module.exports = threadRouter;