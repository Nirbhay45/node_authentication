const nodeMailer = require('../config/nodemailer');
const CONSTANTS = require('../constants/constants');

exports.resetPasswordMail = (name, email, password) => {
    let htmlString = nodeMailer.renderTemplate({password: password, name: name}, '/reset_password.ejs');
    console.log('Inside resetPasswordMail mailer');
    nodeMailer.transporter.sendMail({
        from: 'nirbhayalt64@gmail.com',
        to: email,
        subject: 'Your new password for '+CONSTANTS.app_name,
        html: htmlString
    },(err, info) => {
        if(err){
            console.log("Error in sending mail: ", err);
            return;
        }
        console.log("Email Sent, ", info);
        return;
    })
}