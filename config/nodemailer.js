// REQUIRING MODULES
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// SETTING UP TRANSPORTER FOR MAILER
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    host: 587,
    secure: false,
    auth: {
        user: 'use your email😉',
        pass: 'Use your password 😂'
    }
});

// RENDERING THE TEMPLATE
let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log("Error in rendering template");
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
