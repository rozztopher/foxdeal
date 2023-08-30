require("dotenv").config();

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailNotification(to) {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "mail.infomaniak.com",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USER, // generated ethereal user
			pass: process.env.EMAIL_PASS, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"Fred Foo 👻" <${process.env.EMAIL_USER}>`, // sender address
		to: to, // list of receivers
		subject: "Password reset notification", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Your password has been reset.</b>", // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = sendEmailNotification;
