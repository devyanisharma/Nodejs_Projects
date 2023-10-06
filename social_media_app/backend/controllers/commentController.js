const { Comments } = require("../models/commentModel")
const { Posts } = require("../models/postModel")
const { Users } = require("../models/userModel")

module.exports = {
    addComment: async function (req, res, next) {
        const id = req.params.postId
        console.log(id)
        const { authorId, desc } = req.body;
        try {
            const post = await Posts.findById(id)
            if (post) {
                const comment = new Comments({
                    authorId,
                    desc,
                    post: id
                })
                await comment.save().then(result => {
                    console.log(result)
                    post.comments.push(result.id)
                    post.save();
                    res.status(201).json({ message: "commented", comment: result })
                }).catch(error => {
                    console.log(error)
                })
            } else {
                res.status(400).send({ message: "invalid post" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "internal server error" })
        }

    },
    dltComment: async function (req, res, next) {
        const id = req.params.id;
        let comment;

        try {
            comment = await Comments.findByIdAndRemove(id).populate('post')
            console.log(comment)
          await comment.post.comments.pull(comment);
          await comment.post.save()
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "internal server error" })
        }

        if (!comment) {
            res.status(404).send({ message: "unable to delete" })
        }
        res.status(200).send({ message: "comment deleted successfully", comment: comment.desc })


    }
}