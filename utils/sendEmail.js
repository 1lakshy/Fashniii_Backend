const nodemailer = require("nodemailer");

const sendEmail = async(options) =>{
    const transporter = nodemailer.createTransport({
        host:process.env.MAILER_HOST,
        port:process.env.MAILER_PORT,
        service:process.env.MAILER_SERVICE,
        auth:{
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
        },
    }) ;

    const mailOptions = {
        from:process.env.MAILER_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message, 
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;