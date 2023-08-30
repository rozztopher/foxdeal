import React, { forwardRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
	const { classes, ...other } = props;
	return <Slide direction="up" ref={ref} {...other} />;
});

function PartnerInfoDialog(props) {
	console.log(props.partner);

	return props.partner ? (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
		>
			<DialogTitle className="partner_info-title">{props.partner.name}</DialogTitle>
			<DialogContent>
				<p className="partner_info-credits">
						Credits you will get:{" "}
						<span className="partner_info-credits-red">
							{props.partner.task.credits}
						</span>
					</p>
				<div className="flex-edge mt-38">
					<p className="body-text grey-text">{props.partner.task.desc}</p>
				</div>
			</DialogContent>
		</Dialog>
	) : null;
}

export default PartnerInfoDialog;
