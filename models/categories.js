const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    main: String,
    img: {data: Buffer, contentType: String},
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const commentSchema = new mongoose.Schema({
    name: String,
    content: [contentSchema],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const threadSchema = new mongoose.Schema({
    name: String,
    content: [contentSchema],
    comments: [commentSchema],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const subForumSchema = new mongoose.Schema({
    name: String,
    threads: [threadSchema],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const forumSchema = new mongoose.Schema({
    name: String,
    subForum: [subForumSchema],
    threads: [threadSchema],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const categorySchema = new mongoose.Schema({
    category: String,
    forum: [forumSchema],
}, {timestamps: true})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;