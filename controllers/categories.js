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

// ** D **

// ** U **

// ** C **

// ** E **

// ** S **

// ** Export Sessions Router **
module.exports = categoryRouter;