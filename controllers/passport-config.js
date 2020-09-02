const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/user');


function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        let user = await userModel.findOne({'username' : username}).exec();
        console.log(user);
        if (user == null) {
            return done(null, false, {message: "No user with that email"});
        }

        try{
            if(await bcrypt.compare(password, user.password)) {
                console.log("passed If");
                return done(null, user);
            } else {
                console.log('did not pass if');
                return done(null, false, {message: 'Password Incorrect'});
            }
        } catch(err) {
            return done(err);
        }
    }
    console.log("Initializing passport");
    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((id, done) => {
        userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });
}

module.exports = initialize