// REQUIRING THE MODULES
const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();
console.log('Router Loaded');

// ROUTERS TO DIFFERENT SUB ROUTES
router.get('/', homeController.home);
router.use('/user', require('./users'));
router.use('/users', require('./auth'));


module.exports = router;

