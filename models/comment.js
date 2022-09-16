const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: String,
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content'},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);