const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
    main: String,
    img: {data: Buffer, contentType: String},
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;