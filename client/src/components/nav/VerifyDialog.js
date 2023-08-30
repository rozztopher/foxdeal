import React, { forwardRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
	const { classes, ...other } = props;
	return <Slide direction="up" ref={ref} {...other} />;
});

function VerifyDialog(props) {
	const [code, setCode] = useState("");

	const handleCodeInput = (e) => {
		setCode(e.target.value);
	};

	const switchDialog = () => {
		props.handleVerifyClose();
	};

	const submitForm = () => {
		code && props.handleVerificationCode(code);
	};

	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
		>
			<div className="error-message text-center">
				{props.error ? props.error : ""}
			</div>
			<DialogTitle className="text-center">Verify Mobile Number</DialogTitle>
			<DialogContent>
				<p className="grey-text body-text" htmlFor="terms">
					We sent you a code to verify your phone number: {props.mobile}
				</p>
				<form>
					<input
                        value={code}
						className="form-input"
						id="su-password"
						type="password"
						placeholder="Verification Code"
						onChange={handleCodeInput}
					/>
				</form>
				<div className="cta-button blue fill-button mt-30" onClick={submitForm}>
					Verify Code
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default VerifyDialog;
