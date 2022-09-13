// ** Dependencies **
const express = require('express');
const forumRouter = express.Router();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const Category = require('../models/categories');
const Comment = require('../models/comment');
const Content = require('../models/content');
const Forum = require('../models/forum');
const subForum = require('../models/subForum');
const Thread = require('../models/thread');

// ** I **
forumRouter.get('/post', (req, res) => {
    
})
// ** N **

// ** D **

// ** U **

// ** C **

// ** E **

// ** S **

// ** Export Sessions Router **
module.exports = forumRouter;