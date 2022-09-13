const mongoose = require('mongoose');
const forumSchema = new mongoose.Schema({
    name: String,
    subForum: [{type: mongoose.Schema.Types.ObjectId, ref: 'subForum'}],
    threads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const Forum = mongoose.model('Forum', forumSchema)
module.exports = Forum;