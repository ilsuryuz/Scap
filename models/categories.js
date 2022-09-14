const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: String,
    forum: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forum'}],
}, {timestamps: true})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;