const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    name: String,
    threads: Number,
    posts: Number,
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;