// REQUIRING THE MODULES AND FILES
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');


// ROUTER HANDLING AND PASSING THE WORK TO CONTROLLERS AND AUTHENTICATING WHEN REQUIRED
router.post('/create', usersController.create);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.post('/createsession', passport.authenticate(
        'local',
        {failureRedirect: '/user/signin'}
    ),usersController.createSession);
router.get('/signout', usersController.destroySession);
router.get('/reset/:id', passport.checkAuthentication, usersController.reset);
router.post('/resetpassword/:id', usersController.resetPassword);
router.get('/forgot', usersController.forgot);
router.post('/forgot', usersController.forgotPassword);


module.exports = router;
