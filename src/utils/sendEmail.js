const nodemailer = require('nodemailer');

// Nodemailer
const sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
        secure: false,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        },
    });

  // 2) Define email options (like from, to, subject, email content)
      // <no-reply@t.mail.smartdevicestore.org>
    // from: 'SmartDeviceStore Support <no-reply@t.mail.smartdevicestore.org>',

    const mailOpts = {
        from: 'SmartDeviceStore Support <jsxepress@gmail.com>',
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    // 3) Send email
    await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;