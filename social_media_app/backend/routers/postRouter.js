const express = require('express')
const postRouter = express.Router();
const {upload}= require('../middlewares/mediaUpload')
const postController = require("../controllers/postController")
const getSignedUrl = require('../middlewares/mediaUrl')

postRouter.get('/getFeed',postController.getAllPosts) //fine
postRouter.get('/getPost/:id',postController.getUserPost)
postRouter.post('/addPost',upload.single('media'),getSignedUrl,postController.addPost) //fine
postRouter.put('/updatePost/:postId',postController.updatePost) //fine
postRouter.get('/getPost/:id',postController.getPostById) //fine
postRouter.delete('/deletePost/:id',postController.deletePost) //fine



module.exports = postRouter;