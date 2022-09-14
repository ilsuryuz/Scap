// ** Dependencies **
const express = require('express');
const forumRouter = express.Router();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const Category = require('../models/categories');

// ** I **
forumRouter.get('/', (req, res) => {
    Category.populate('forum')
    console.log(Category)
    Category.find({}, (error, allForums) => {
        res.render('forum/index.ejs', {
            forums: allForums,
        })
    })
})
// ** N **
forumRouter.get('/new-category', (req, res) => {
    res.render('forum/new-category.ejs')
})
// ** D **

// ** U **

// ** C **
forumRouter.post('/', (req, res) => {
    Category.create(req.body, (err, createdProduct) => {
        res.send(req.body)
    })
})
// ** E **

// ** S **

// ** Export Sessions Router **
module.exports = forumRouter;