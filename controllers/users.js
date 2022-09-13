// ** Dependencies **
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// ** New reg page **
userRouter.get('/new', (req, res) => {
	res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    })
});
// ** Create reg route **
userRouter.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        console.log(req.body)
        res.redirect('/');
    })
})

// ** Export **
module.exports = userRouter;