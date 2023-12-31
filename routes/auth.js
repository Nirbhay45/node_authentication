// REQUIRING THE MODULES
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

// HANDELING THE GOOGLE OAUTH REQUESTS 
router.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}), usersController.createSession);

module.exports= router;