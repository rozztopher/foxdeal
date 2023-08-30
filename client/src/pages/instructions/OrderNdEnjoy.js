import { Link } from "react-router-dom";
const OrderNdEnjoy = ({ setStep,handleShowInstructions }) => {
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
				<img src="/images/HAND3.png" alt="waving hand"></img>
			</div>
			<div>
				<p className="instructions__dialog-step">STEP 3</p>
				<h4 className="instructions__dialog-title">
					Order and enjoy the honor
				</h4>
			</div>
			<div>
				<p className="instructions__dialog-text">
					But I must explain to you how all this mistaken idea of the give you
					denouncing pleasure lorem ipsum sit dosor. Amet minim mollit non
					deserunt ullamco est sit aliqua dolor do amet sint.
				</p>
			</div>
			<div>
				<Link to='/products'>
					<button
						className="instructions__dialog-button instructions__dialog-close-button"
						onClick={(e) => setStep(4)}
					>
						Get Started
					</button>
				</Link>
			</div>
		</div>
	);
};

export default OrderNdEnjoy;
