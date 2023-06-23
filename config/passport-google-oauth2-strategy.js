const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
        clientID:'34957644922-nf2c4jobl0m9v1crh64nvsqlmgt4t49m.apps.googleusercontent.com',
        clientSecret:'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',
        callbackURL:'http://localhost:8000/users/auth/google/callback'
    },
    async function(accessToken, refreshToken, profile, done){
        const user = await User.findOne({ email: profile.emails[0].value });
        if(user){
            req.flash('success', 'Logged in Successfully');
            console.log(user.name, user.email, user.password);
            return done(null, user);
        }else{
            let user = User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            if(user){
                req.flash('success', 'Signed up Successfully');
                return done(null, user);
            }else{
                req.flash('error', 'Error in creating user');
                console.log('error in creating user');
                    return;
            }
            
        }
    }

));

module.exports = passport;
