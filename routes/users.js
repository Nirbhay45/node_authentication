const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');




// router.get('/sign-in',usersController.signin);

router.post('/create', usersController.create);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.post('/createsession', passport.authenticate(
        'local',
        {failureRedirect: '/user/signin'}
    ),usersController.createSession);
router.get('/signout', usersController.destroySession);
router.get('/reset/:id', passport.checkAuthentication, usersController.reset);
router.post('/resetpassword/:id', usersController.resetPassword)


module.exports = router;
