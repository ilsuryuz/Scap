const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: String,
}, {timestamps: true,})

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: false},
}, {
    posts: [postSchema]
}
)

const User = mongoose.model('User', userSchema)
module.exports = User;