// ** Dependencies **
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user');

// ** New (login page) **
sessionsRouter.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

// ** Delete (logout route) **
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})
// ** Create (login route) **
sessionsRouter.post('/', (req, res) => {
    // ** Check for existing user **
    User.findOne({
        username: req.body.username,
    }, (error, foundUser) => {
        if (!foundUser) {
            res.send(`Oops! No user with that email address has been registered`);
        } else {
            // ** If a user has been found **
            // ** compare the given password with the hashed password we have stored **
            const passMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            // ** If the password matches **
            if (passMatches) {
                // ** add the user to our session **
                req.session.authenticated = true;
                req.session.currentUser = foundUser;

                // ** redirect back to our home page **
                res.redirect('/');
            } else {
                // ** if the password don't match **
                res.send('Oops! Invalid credentials.');
            }
        }
    })
})
// ** Export Sessions Router **
module.exports = sessionsRouter;