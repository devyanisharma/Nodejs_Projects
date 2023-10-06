const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            },
            message: 'Invalid email address',
        },
    },

    password: {
        hash: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        }
    },
    posts: [
        { 
            type: mongoose.Types.ObjectId, 
            ref: "Post", 
            required: true
         }
        ]

}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);//collection users ic created

module.exports = { Users: userModel };