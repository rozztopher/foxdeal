import React, { forwardRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
	const { classes, ...other } = props;
	return <Slide direction="up" ref={ref} {...other} />;
});

function ThankYouDialog(props) {
	const submitForm = () => {
		props.handleThankYouClose();
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
			<DialogTitle className="text-center">Thank You</DialogTitle>
			<DialogContent>
				<p className="grey-text body-text" htmlFor="terms">
					The phone number verified! Let's begin our journey through the site.
				</p>
				<div className="cta-button red fill-button mt-30" onClick={submitForm}>
					Get Started
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ThankYouDialog;
