const HowDoesItWork = ({ setStep, handleShowInstructions }) => {
	return (
		<div className="instructions__dialog">
			<div className="instructions__dialog-close">
				<img
					src="/images/remove.svg"
					alt="remove dialog"
					onClick={(e) => {
						setStep(0);
						handleShowInstructions();
					}}
				></img>
			</div>
			<div>
				<img src="/images/Hand_0.png" alt="waving hand"></img>
			</div>
			<div>
				<p className="instructions__dialog-step">Instructions</p>
				<h4 className="instructions__dialog-title">How does it work</h4>
			</div>
			<div>
				<p className="instructions__dialog-text">
					But I must explain to you how all this mistaken idea of the give you
					denouncing pleasure lorem ipsum sit dosor. Amet minim mollit non
					deserunt ullamco est sit aliqua dolor do amet sint.
				</p>
			</div>
			<div>
				<button
					className="instructions__dialog-button"
					onClick={(e) => setStep(1)}
				>
					View First Step
				</button>
			</div>
		</div>
	);
};

export default HowDoesItWork;
