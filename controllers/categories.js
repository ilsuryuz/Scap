// ** Dependencies **
const express = require('express');
const categoryRouter = express.Router();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const Category = require('../models/categories');

// ** I **
categoryRouter.get('/', (req, res) => {
    Category.find({}, (error, allForums) => {
        console.log(allForums)
        res.render('forum/index.ejs', {
            forums: allForums,
        })
    })
})
// ** N **
categoryRouter.get('/new-category', (req, res) => {
    res.render('forum/new-category.ejs')
})
// ** D **

// ** U **

// ** C **
categoryRouter.post('/', (req, res) => {
    Category.create(req.body, (err, createdProduct) => {
        res.send(req.body)
    })
})
// ** E **

// ** S **

// ** Export Sessions Router **
module.exports = categoryRouter;