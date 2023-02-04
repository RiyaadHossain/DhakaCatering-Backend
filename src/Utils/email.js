const nodemailer = require('nodemailer');

// 1. Sending Email 
exports.sendMail = (mailInfo) => {

    //Step 1: Creating the transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS
        }
    });

    //Step 2: Setting up message options
    const messageOptions = {
        subject: mailInfo.subject,
        text: mailInfo.html,
        to: mailInfo.email,
        from: "Dhaka Catering"
    };

    //Step 3: Sending email
    transporter.sendMail(messageOptions);
}