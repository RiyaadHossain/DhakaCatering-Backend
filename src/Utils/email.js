const nodemailer = require('nodemailer');

// 1. Sending Email 
exports.sendMail = (mailInfo) => {

    //Step 1: Creating the transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.email",
        service: "gmail",
        // port: 587,
        // secure: false, // true for 465, false for other ports
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
    transporter.sendMail(messageOptions)
        .then(info => console.log({info}))
        .catch(error => console.log({error}));;
}