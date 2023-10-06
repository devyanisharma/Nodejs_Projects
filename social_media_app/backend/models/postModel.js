const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    media: [
        {
            type: {
                type: String, // 'image' or 'video'
                enum: ['image', 'video'],
                required: true,
            },
            url: {
                type: String, // URL to the image or video file
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Reference to the User model for the user who created the post
        required: true,
    },
    comments: [
        {
           type:mongoose.Types.ObjectId,
           ref:'Comment',
           required:true
        }
    ]
},{timestamps:true})

const postModel = mongoose.model('Post',postSchema)
module.exports = {Posts:postModel};