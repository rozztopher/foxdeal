import React, { forwardRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
	const { classes, ...other } = props;
	return <Slide direction="up" ref={ref} {...other} />;
});

function ForgotPassword(props) {
	const [email, setEmail] = useState("");

	const handleEmailInput = (e) => {
		setEmail(e.target.value);
	};

	const verifyEmail = (email) => {
		props.verifyEmail(email);
	};
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
			<DialogTitle className="text-center">Forgot your password?</DialogTitle>
			<DialogContent>
				<form>
					<div className="mt-24">
						<label className="grey-text body-text" htmlFor="terms">
							Enter an email address you use to sign in to and we will send a
							password recover instructions
						</label>
						<input
							className="form-input"
							id="su-email"
							placeholder="Email"
							onChange={handleEmailInput}
						/>
					</div>
				</form>
				<div
					className="cta-button blue fill-button mt-30"
					onClick={() => verifyEmail(email)}
				>
					Send
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ForgotPassword;
