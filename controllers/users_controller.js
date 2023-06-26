// REQUIRING FILES AND MODULES
const express = require("express");
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require("../mailers/reset_password");


// render the reset password page
module.exports.forgot = async function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render(
        'forgot'
    );
}

//render the sign up page
module.exports.signup = async function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render(
        'register',{
            title: "Codeial | Sign Up"
        }
    );
}
// render the signin page
module.exports.signin = async function(req, res){
    if(req.isAuthenticated()){
        // getting to home page.
        return res.redirect('/');
    }
    return res.render(
        'login',{
            title: "Codeial | Sign In"
        }
    );
}


//get the sign up data
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Password\'s Don\'t match.');
        return res.redirect('back');
    }
    let user = await User.findOne({email: req.body.email});
    if(!user){
        const {email, password, name} = req.body;
        // HASING THE PASSWORD
        const hash = await bcrypt.hash(password, 10);

        const user = {email, name, password:hash};
        await User.create(user);
        req.flash('success', 'Signup Successfull');
        return res.redirect('/user/signin');
    }else{
        req.flash('error', 'User already present');
        return res.redirect('back');
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    console.log('createSession handled');
    //req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    // logout function comes from passport
    req.logout(function(err){
        if(err){
            console.log('error in logging out');
        }
    });
    req.flash('success', 'You have logged out');
    return res.redirect('/user/signin');
}

// RENDERING THE RESET PAGE
module.exports.reset =async function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('/user/login');
    }
    return res.render(
        'reset',{
            id: req.user.id,
        }
    );
}
// HANDLING THE POST REQUEST FOR RESET PASSWORD
module.exports.resetPassword =async function(req, res){
    let user = await User.findById(req.params.id);
    if(!user){
        console.log("User not found for password reset");
        return res.redirect('/');
    }
    if(req.body.password==req.body.confirm_password){
        // CREATING HASH FOR THE PASSWORD PROVIDED
        const hash = await bcrypt.hash(req.body.password, 10);
        const password = hash;
        user.password = password;
        await user.save();
        req.flash('success', 'Password Reset Successfully');
        return res.redirect('/');
        
    }else{
        req.flash('error', 'Password\'s Don\'t match.');
        return res.redirect('back');
    }
}
// HANDELING THE POST REQUEST FOR FORGOT PASSWORD
module.exports.forgotPassword = async function(req, res){
    let user = await User.findOne({email: req.body.email});
    if(user){
        // GENERATING A RANDOM PASSWORD
        let password = crypto.randomBytes(20).toString('hex');
        // HASHING THE CREATED PASSWORD TO STORE IN DB
        let hash = await bcrypt.hash(password, 10);
        user.password = hash;
        await user.save();

        // SENDING RANDOMLY GENERATED PASSWORD TO THE USER ON MAIL
        nodemailer.resetPasswordMail(user.name,user.email, password);
        req.flash('success', "New password sent to you via email");
        return res.redirect('/user/signin');

    }if(!user){
        req.flash('error', "User not found");
        return res.redirect('back');
    }
}