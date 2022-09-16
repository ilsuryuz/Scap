const mongoose = require('mongoose');


const threadSchema = new mongoose.Schema({
    name: String,
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content'},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;