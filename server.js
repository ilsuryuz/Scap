// ** Dependencies **
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const { Socket } = require('dgram');
require('dotenv').config();


// ** Socket.io ** ref: https://esc-wq.medium.com/simple-chat-server-using-nodejs-socket-io-ce31294926d1
const path = require('path');
const server = require('http').createServer(app)
const io = require('socket.io')(server)


// ** Database Connection **
mongoose.connect(process.env.DATABASE_URL);

// ** DB Connection Error/Success **
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ** Middleware **
// ** Let socket.io know we are working with ejs **
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// *** Body-Parser ***
app.use(express.urlencoded({ extended: true }));

// *** Method-Override ***
app.use(methodOverride('_method'));

// *** Public ***
app.use('/Public', express.static('Public'));


// *** Session ***
// ** Declare Session middleware for whole app **
const sessionMiddleware = session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
});
// ** Use session for the app **
app.use(sessionMiddleware)
// ** Let Socket.io use same middleware as app **
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// ** Only allow authenticated users for socket.io **
io.use((socket, next) => {
    const session = socket.request.session;
    if (session && session.authenticated) {
        next();
    } else {
        next(new Error("unauthorized"))
    }
});

// ** Communication between client and server for Live Chat **
io.on('connection', (socket) => {
    console.log("a user connected via socket!");
    socket.on('chat message', (msg) => {
        const username = socket.request.session.currentUser.username;
        console.log("Message: " + msg)
        io.emit('chat message', {message: msg, username: username})
    });
    socket.on('disconnect', () => {
        console.log("disconnected user")
    });
});


// ** Routes **
// ** Server Index **
app.get('/', (req, res) => {
    if (req.session.currentUser) {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
        })
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
        });
    };
});

// *** Controllers ***
// ** User **
const userController = require('./controllers/users');
app.use('/users', userController);
// ** Session **
const sessionController = require('./controllers/sessions');
app.use('/sessions', sessionController)
// ** Categories **
const categoryController = require('./controllers/categories');
app.use('/category', categoryController)
// ** Forum **




// ** Listener **
const PORT = process.env.PORT;
// ** Server.listen for Socket.io to work **
server.listen(PORT, () => console.log(`We live on port: ${PORT}`));

