// ** Dependencies **
const express = require('express');
const categoryRouter = express.Router();
require('dotenv').config();

const Category = require('../models/categories');

// ** I **
categoryRouter.get('/', (req, res) => {
    Category.find({}, (error, allCategories) => {
        res.render('category/index.ejs', {
            category: allCategories,
        })
    })
})
// ** N **
categoryRouter.get('/new-category', (req, res) => {
    res.render('category/new-category.ejs')
})
// ** D **
categoryRouter.delete("/:id", (req, res) => {
    Category.findByIdAndDelete(req.params.id, (err, deletedCategory) => {
        console.log(deletedCategory)
    })
})
// ** U **
categoryRouter.put('/:id/', (req, res) => {
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
categoryRouter.post('/', (req, res) => {
    Category.create(req.body, (err, createdProduct) => {
        res.send(req.body)
    })
})
// ** E **
categoryRouter.get('/:id/edit', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        res.render('category/edit.ejs', {
            category: foundCategory,
        })
    })
})
// ** S **
categoryRouter.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        res.render('category/show.ejs', {
            category: foundCategory
        })
    })
})
// ** Export Sessions Router **
module.exports = categoryRouter;