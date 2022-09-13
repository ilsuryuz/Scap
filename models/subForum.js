const mongoose = require('mongoose');
const subForumSchema = new mongoose.Schema({
    name: String,
    threads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const subForum = mongoose.model('subForum', subForumSchema)
module.exports = subForum;