const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    name: String,
    threads: Number,
    posts: Number,
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;