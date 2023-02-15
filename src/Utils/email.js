const nodemailer = require('nodemailer');

// 1. Sending Email 
exports.sendMail = (mailInfo) => {

    //Step 1: Creating the transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS
        }
    });

    //Step 2: Setting up message options
    const messageOptions = {
        from: '"Dhaka Catering 🍔" <riyadhossain017037@gmail.com>',
        subject: mailInfo.subject,
        html: mailInfo.html,
        to: mailInfo.email,
    };

    //Step 3: Sending email
    transporter.sendMail(messageOptions);
}
