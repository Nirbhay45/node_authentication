// REQUIRING MODULES
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// IMPORTING THE USER SCHEMA
const User = require("../models/user");

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, async function(req, email, password, done){

        // find a user and establish the identity
        let user = await User.findOne({
            email: email
        });
        // CHECKING THE PASSWORD HASH FOR A MATCH
        let password_matched = await bcrypt.compare(password, user.password);
        if(!user || !password_matched){
            req.flash('error', 'Invalid username/password');
            return done(null, false);
        }
        req.flash('success', 'Logged in Successfully');
        return done(null, user);
    }
));

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(async function(id, done){
    let user = await User.findById(id);
    return done(null, user);
});
//check if th user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signedin user from the current signed in cookie and we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;