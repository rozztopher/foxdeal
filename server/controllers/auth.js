const twilioClient = require("../utils/twilioClient");

/**
 * register
 */
const usersDao = require("../daos/user");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const { forgotPasswordJwt } = require("../utils/fogotPasswordJwt");
const jwt = require('jsonwebtoken');
const sendEmailNotification = require("../utils/mailAgent");
exports.register = async (req, res) => {
	try {
		const { code, email, name, mobile, password } = req.body;
		let [err, user] = await usersDao.fetch({ condition: { email: email } });
		if (err || user) {
			return res.status(409).json({ message: "E-Mail existiert bereits!" });
		}

		let twilioResponse = await twilioClient.verify
			.services(process.env.TWILIO_VERIFY_SERVICE)
			.verificationChecks.create({ to: mobile, code: code });
		if (twilioResponse.status === "approved") {
			const salt = await bcrypt.genSalt(10);
			const bcryptPassword = await bcrypt.hash(password, salt);
			[err, user] = await usersDao.create({ email, name, bcryptPassword });
			if (err || !user)
				return res.status(402).json({ message: "database error!" });
			const jwtToken = await jwtGenerator(delete user.password);
			return res.json({ jwtToken });
		} else {
			return res.status(401).json({ message: "Invalid verification code" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

/***
 * Login
 */

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		let [err, user] = await usersDao.fetch({ condition: { email: email } });
		if (err || !user)
			return res
				.status(401)
				.json({ message: "Diese E-Mail-Adresse existiert nicht!" });
		user = user.dataValues;
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ message: "Ungültiges Passwort" });
		}
		const jwtToken = jwtGenerator(user);
		delete user.password;
		return res.json({
			jwtToken,
			user: user,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};

exports.sendSms = async (req, res) => {
	let { email } = req.body;
	let [err, user] = await usersDao.fetch({ condition: { email: email } });
	if (err || user) {
		return res.status(409).json({ message: "E-Mail existiert bereits!" });
	}
	let { mobile } = req.body;
	try {
		let verification = await twilioClient.verify
			.services(process.env.TWILIO_VERIFY_SERVICE)
			.verifications.create({ to: mobile, channel: "sms" });
		// .then((verification) => console.log(verification.status));
		if (verification.status === "pending") {
			return res.status(200).json({ message: "sent verification code" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Server error");
	}
};

exports.forgotPassword = async (req, res) => {
	let { email } = req.body;
	let [err, user] = await usersDao.fetch({ condition: { email: email } });
	if (err || !user) {
		return res.status(404).json({ message: "E-Mail existiert nicht!" });
	}
	const passwordResetJwt = forgotPasswordJwt(user)
	return res.status(200).json({passwordResetJwt})
};

exports.resetPassword = async (req,res) => {
	let {passwordResetJwt,newPassword} = req.body
	try {
		let payload = jwt.verify(passwordResetJwt,process.env.jwtSecret)
		let email = payload.user.email
		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(newPassword, salt);
		let [err,result] = await usersDao.update({password:bcryptPassword},{email})
		if(err || !result){
			return res.status('404').json({message:"Email doesn't exist"})
		}
		sendEmailNotification(email)
		return res.status(200).json({message:"Password changed"})
	} catch (error) {
		console.log(error)
		return res.status('401').json({message:"Unauthorized to reset the password"})
	}
}
/***
 * verify
 */

exports.verify = async (req, res) => {
	res.json({
		valide: true,
		user: req.user,
	});
};
