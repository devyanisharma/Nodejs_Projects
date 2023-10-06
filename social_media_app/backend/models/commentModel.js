const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post', 
        required: true
    }

}, { timestamps: true })

const commentModel = mongoose.model('Comment', commentSchema)

module.exports = { Comments: commentModel }