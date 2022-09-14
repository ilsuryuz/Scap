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

// ** C **
categoryRouter.post('/', (req, res) => {
    Category.create(req.body, (err, createdProduct) => {
        res.send(req.body)
    })
})
// ** E **

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