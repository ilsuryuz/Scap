// ** Dependencies **
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();

// ** Database Connection **
mongoose.connect(process.env.DATABASE_URL);

// ** DB Connection Error/Success **
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ** Middleware **
// *** Body-Parser ***
app.use(express.urlencoded( {extended: true}));
// *** Method-Override ***
app.use(methodOverride('_method'));
// *** Public ***
app.use('/Public', express.static('Public'));
// *** Controllers ***

// ** Listener **
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`We live on port: ${PORT}`));