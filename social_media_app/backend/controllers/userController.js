const { Users } = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const passport = require("passport")

module.exports = {
    register: async function (req, res, next) {
        try {
            const { name, username, email, password } = req.body;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const user = new Users({
                name,
                username,
                email,
                password: {
                    hash,
                    salt,
                },
                posts: []
            });
            const newuser = await user.save()
            console.log(`newuser ${newuser}`)
            res.status(201).json({ message: 'User registered successfully', "user": newuser });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    login: function (req, res, next) {

        passport.authenticate('local', { session: false }, (err, user, info) => {

            if (err || !user) {
                console.log(err);
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user: user
                });
            }

            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }

                const token = jwt.sign(user, 'your_jwt_secret', {
                    expiresIn: '1h' // expires in 24 hours

                });

                return res.json({ user, token });
            });
        })
            (req, res);

    },

    logout: function (req, res, next) {
        
        res.send({ message: 'Logged out successfully', user: req.user });
        
    }


}


