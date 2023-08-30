import Modal from "./Modal";
import HowDoesItWork from "./HowDoesItWork";
import ChooseProduct from "./ChooseProduct";
import ChoosePartner from "./ChoosePartner";
import OrderNdEnjoy from "./OrderNdEnjoy";
import React, { useState } from "react";

const Instructions = ({handleShowInstructions}) => {
	const [step, setStep] = useState(0);
	let elementToReturn = null;
	switch (step) {
		case 0: {
			elementToReturn = (
				<Modal>
					<HowDoesItWork setStep={setStep} handleShowInstructions={handleShowInstructions}/>
				</Modal>
			);
			break;
		}
        case 1: {
            elementToReturn = (
				<Modal>
					<ChooseProduct setStep={setStep} handleShowInstructions={handleShowInstructions}/>
				</Modal>
			);
			break;
        }
        case 2: {
            elementToReturn = (
				<Modal>
					<ChoosePartner setStep={setStep} handleShowInstructions={handleShowInstructions}/>
				</Modal>
			);
			break;
        }
        case 3: {
            elementToReturn = (
				<Modal>
					<OrderNdEnjoy setStep={setStep} handleShowInstructions={handleShowInstructions}/>
				</Modal>
			);
			break;
        }
		default:
			elementToReturn = null;
	}
	return elementToReturn;
};

export default Instructions;
