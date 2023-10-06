const express = require("express");
const commentRouter = express.Router()
const commentController = require("../controllers/commentController")
commentRouter.post('/:postId/add', commentController.addComment)
commentRouter.delete('/:id', commentController.dltComment)

module.exports = commentRouter;