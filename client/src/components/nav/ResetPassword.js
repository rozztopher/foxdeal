import React, { forwardRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
	const { classes, ...other } = props;
	return <Slide direction="up" ref={ref} {...other} />;
});

function ResetPassword(props) {
	const [password, setPassword] = useState("");
	const [passwordConfoirmation, setPasswordConforimation] = useState("");
	const [error, setError] = useState("");

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleConfoirmationChange = (e) => {
		setPasswordConforimation(e.target.value);
	};
	const handlePasswordReset = () => {
        if (password !== passwordConfoirmation) {
            setError("Password doesn't Match");
            return
		}
        props.handlePasswordReset(password);
	};
	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
		>
			{error ? (
				<div className="error-message text-center">
					{error}
				</div>
			) : null}
			<DialogTitle className="text-center">Forgot your password?</DialogTitle>
			<DialogContent>
				<form>
					<div className="mt-24">
						<label className="grey-text body-text" htmlFor="terms">
							Enter an email address you use to sign in to and we will send a
							password recover instructions
						</label>
						<input
							value={password}
							className="form-input"
							id="su-email"
							placeholder="New Password"
							onChange={handlePasswordChange}
						/>
						<input
							value={passwordConfoirmation}
							className="form-input"
							id="su-email"
							placeholder="Re-enter Password"
							onChange={handleConfoirmationChange}
						/>
					</div>
				</form>
				<div
					className="cta-button blue fill-button mt-30"
					onClick={handlePasswordReset}
				>
					Reset password
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ResetPassword;
