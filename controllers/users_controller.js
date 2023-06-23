const express = require("express");
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


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
        const hash = await bcrypt.hash(password, 10);
        const user = {email, name, password:hash};
        console.log(email, hash, password, name);
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
module.exports.reset =async function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('/user/login');
    }
    //let user = await User.findById(req.params.id);
    return res.render(
        'reset',{
            id: req.user.id,
        }
    );
}

module.exports.resetPassword =async function(req, res){
    let user = await User.findById(req.params.id);
    if(!user){
        console.log("User not found for password reset");
        return res.redirect('/');
    }
    if(req.body.password==req.body.confirm_password){
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