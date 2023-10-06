const express = require('express')
const authRouter = express.Router();
const validateuser = require("../middlewares/validationUser")
const userController = require("../controllers/userController");
const passport = require("passport")


authRouter.post('/register', validateuser.isUserExists, validateuser.validateUser, userController.register) //fine
authRouter.post('/login',userController.login) 
authRouter.post('/logout', passport.authenticate('jwt', { session: false }), userController.logout)


module.exports = authRouter;