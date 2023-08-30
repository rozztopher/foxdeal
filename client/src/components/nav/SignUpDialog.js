import React, { forwardRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
	const { classes, ...other } = props;
	return <Slide direction="up" ref={ref} {...other} />;
});

function SignUpDialog(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [password, setPassword] = useState("");

	const handleNameInput = (e) => {
		setName(e.target.value);
	};

	const handleEmailInput = (e) => {
		setEmail(e.target.value);
	};
	const handleMobileInput = (e) => {
		setMobile(e.target.value);
	};
	const handlePasswordInput = (e) => {
		setPassword(e.target.value);
	};

	const switchDialog = () => {
		props.handleClose();
		props.switchDialog();
	};
	const verifyMobileNumber = (name, email, mobile, password) => {
		props.verifyMobileNumber(name, email, mobile, password);
	};
	// const submitForm = () => {
	// 	props.register(name, email, mobile, password);
	// };

	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
		>
			<div className="error-message text-center">
				{" "}
				{props.error ? props.error : ""}{" "}
			</div>
			<DialogTitle className="text-center">{"Sign up"}</DialogTitle>
			<DialogContent>
				<form>
					<input
						className="form-input"
						id="su-name"
						placeholder="Name"
						onChange={handleNameInput}
					/>
					<input
						className="form-input"
						id="su-email"
						placeholder="Email"
						onChange={handleEmailInput}
					/>
					<input
						className="form-input"
						id="su-mobile"
						placeholder="Mobile Nummer"
						onChange={handleMobileInput}
					/>
					<input
						className="form-input"
						id="su-password"
						type="password"
						placeholder="Passwort"
						onChange={handlePasswordInput}
					/>
					<div className="mt-24">
						<input
							className="checkbox"
							type="checkbox"
							id="su-terms"
							name="terms"
							value={true}
						/>
						<label className="grey-text body-text" htmlFor="terms">
							Ich stimme den Allgemeinen Geschäftsbedingungen und der
							Datenschutzerklärung zu.
						</label>
					</div>
				</form>
				<div
					className="cta-button blue fill-button mt-30"
					onClick={() => verifyMobileNumber(name, email, mobile, password)}
				>
					Konto erstellen
				</div>
				<div onClick={switchDialog}>
					<p className="body-text grey-text text-center mt-38">
						Du hast schon ein Konto?&nbsp;&nbsp;
						<span className="hyperlink">
							&nbsp;&nbsp;Log dich lieber hier ein
						</span>
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default SignUpDialog;
