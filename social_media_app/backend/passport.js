const { Users } = require("./models/userModel")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require("bcrypt")

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {

        //Assume there is a DB module providing a global Users
        return Users.findOne({ email })
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email' });
                }
                const compare = bcrypt.compare(password, user.password.hash)
                if (compare) {
                    payload = {
                        userId:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                    return cb(null, payload, {
                        message: 'Logged In Successfully'
                    });
                } else {
                    return cb(null, false, {
                        message: 'Incorrect password'
                    });
                }

            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {

        console.log(`jwt payload ${jwtPayload.userId}`)
        //find the user in db 
        return Users.findById(jwtPayload.userId)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));