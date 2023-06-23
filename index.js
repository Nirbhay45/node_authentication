// IMPORTING MODULES
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const mongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');

//  REQUIRING FILES
const db = require('./config/mongoose');
const CONSTANTS = require('./constants/constants');
const MongoStore = require('connect-mongo');
const customMware = require('./config/middleware');

// DEFINING CONSTANTS
const PORT = CONSTANTS.server_port;
const url = CONSTANTS.mongo_url;

// INITIATING EXPRESS
const app = express();

//MIDDLEWARE
app.use(express.urlencoded());
app.use(cookieParser());

// USING STATIC FILES
app.use("/assets", express.static('./assets'));
// app.use(express.static('./assets'));

// TELL APP TO USE LAYOUT
app.use(expressLayout);

// EXTRACT STYLE AND SCRIPTS FROM SUB PAGES INTO THE LAYOUT
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// MONGO STORE IS USED TO STORE THE SESSION COOKIE IN THE DB
app.use(session({
    name: CONSTANTS.app_name,
    secret: CONSTANTS.app_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: CONSTANTS.app_cookie_maxage
    }, store: MongoStore.create({
        mongoUrl: CONSTANTS.mongo_url,
        autoRemove: 'disabled'
    }),
}))

app.use(passport.initialize());
app.use(passport.session());
//TODO app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// USE EXPRESS ROUTER
app.use('/', require('./routes'));

// SET UP THE VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// STARTING SERVER
app.listen(PORT, function(err){
    if(err){
        console.log('Error in running the server: ', err);
        return;
    }
    console.log(`Server is up and running on the port ${PORT}`);
    console.log(`Visit 127.0.0.1:${PORT}`);
});