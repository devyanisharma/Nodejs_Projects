const { Users } = require("../models/userModel");
const { Posts } = require("../models/postModel");
const mongoose = require("mongoose");


module.exports = {
    getAllPosts: async function (req, res, next) {
        let posts;
        try {
            posts = await Posts.find({}).populate('comments').sort({createdAt: -1}).limit(20)
            console.log(posts);
            if (!posts) {
                res.status(404).send({ message: 'no post found' })
            } else {
                res.status(200).send({ message: "all posts fetched successfully", posts: posts })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "internal server error" })
        }
    },
    getUserPost: async function (req, res, next) {
        let id = req.params.id;
        console.log(id)
        let posts;
        try {
            posts = await Posts.find({user:id}).sort({createdAt: -1}).limit(20)
            console.log(posts)
            if (!posts) {
                res.status(404).send({ message: 'no post found' })
            } else {
                res.status(200).send({ message: "all posts fetched successfully", posts: posts })
            }

        } catch (error) {
            res.status(500).send({ message: "internal server error" })
        }
    },
    addPost: async function (req, res, next) {
        console.log('Successfully uploaded files!')
        console.log(`${req.body}`)
        let existingUser;
        const { caption, media, userId } = req.body
        console.log(`request body ${req.body.userId}`)
        console.log(caption + "," + media + userId )
        try {
            existingUser = await Users.findById(userId)
            console.log(`user id ${existingUser}`)
        } catch (error) {
            console.log(error)
        }
        if (!existingUser) {
            res.status(404).json({ message: "unable to find user by userid" })
        }
        const parts = media.split('.')

        let mediatype = parts[1]
        if (mediatype === "img" || mediatype === "png") {
            mediatype = "image"
        } else {
            mediatype = "video"
        }
        const post = new Posts({
            caption,
            media: {
                type: mediatype,
                url: media
            },
            user: userId,
            comments: [

            ]
        })

        console.log(`post  ${post}`)

        const session = await mongoose.startSession();

        const result = await post.save({ session });
        existingUser.posts.push(post);
        await existingUser.save({ session });

        res.status(201).json({ message: "post created successfully", "post": result })


    },
    updatePost: async function (req, res, next) {
        let caption = req.body.caption;
        console.log(caption)
        const id = req.params.postId;

        try {

            let post = await Posts.findByIdAndUpdate(id,{caption:caption},{returnOriginal:false})
           // console.log(post);
            const result = await post.save();
            console.log(result)
           // res.status(200).json({ message: "post updated successfully", post: post })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "internal server error" })
        }

    },


    getPostById:
        async function (req, res, next) {
            try {
                const id = req.params.id
                await Posts.findById(id).then((post) => {
                    if (post) {
                        res.status(200).send({ "message": "post fetched successfully", post: post })
                    } else {
                        res.status(404).send({ "message": "post not found" })
                    }
                }).catch((error) => {
                    //console.log(error)
                    res.status(400).send({ "message": "Invalid post id" })

                })
            } catch (error) {
                console.log(error)
                res.status(500).send({ message: "internal server error" })
            }
        },
    deletePost:
        async function (req, res, next) {
            const id = req.params.id
            let post;
            try {
                post = await Posts.findByIdAndRemove(id).populate('user')
                await post.user.posts.pull(post) //removing from users array
                await post.user.save()
            } catch (error) {
                //console.log(error)
                res.status(400).send({ "message": "Invalid post id" })
            }
            if (!post) {
                res.status(200).send({ message: "post not available" })
            }
            res.status(200).send({ message: "post deleted successfully" })

        }

}
