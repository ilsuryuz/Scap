// ** Dependencies **
const express = require('express');
const forumRouter = express.Router();
require('dotenv').config();

const Forum = require('../models/forum');
const Category = require('../models/categories')

// ** N **
forumRouter.get('/:category/new-forum', (req, res) => {
    res.render('forum/new-forum.ejs', 
    {catID: req.params.category})
})
// ** D **
forumRouter.delete("/:id", (req, res) => {
    Category.findByIdAndDelete(req.params.id, (err, deletedCategory) => {
        res.redirect('/category')
    })
})
// ** U **
forumRouter.put('/:id/', (req, res) => {
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
forumRouter.post('/:category', (req, res) => {
    Forum.create(req.body, (err, createdForum) => {
        console.log(req.session.currentUser._id)
        createdForum.creator = req.session.currentUser;
        createdForum.save()

        Category.findById(req.params.category, (err, foundCategory) => {
            foundCategory.forum.push(createdForum._id)
            foundCategory.save()
        })
        // createdForum.save(function (error) {
        //     if (!error) {
        //         Forum.findOne({_id: createdForum._id}).populate('creator').exec(function (error, post){
        //             console.log(JSON.stringify(post, null, "\t"))
        //         })
        //     }
        // })
        console.log(createdForum)
        res.redirect('/')
    })
})
// ** E **
forumRouter.get('/:id/edit', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        res.render('category/edit.ejs', {
            category: foundCategory,
        })
    })
})
// ** S **
forumRouter.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        res.render('category/show.ejs', {
            category: foundCategory
        })
    })
})
// ** Export Sessions Router **
module.exports = forumRouter;