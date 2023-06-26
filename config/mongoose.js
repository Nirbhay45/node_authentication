// require the library
const mongoose = require('mongoose');

// IMPORTING FILES
const CONSTANTS = require('../constants/constants');


// url to mongo atlas 
const url= CONSTANTS.mongo_url;
mongoose.url = url;
//connect to db
mongoose.connect(url);

//aquire the connection (to check if it is successful)
const db = mongoose.connection;

// Print error if error
db.on('error', console.error.bind(console, 'error connecting to db.\nCheck Internet Connection.\n\n\n\n'));

// un and running then print the message
db.once('open',function(){
    console.log("Successfully connected to the mongodb database");
});

module.exports = db;