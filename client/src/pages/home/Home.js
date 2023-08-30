import React, { useState, useContext } from "react";
import HomeHero from "./HomeHero";
import HomeInstructions from "./HomeInstructions";
import Instructions from "../instructions/Instructions";
import HomeProductView from "./HomeProductView";
import {
	InstructionsContext,
} from "../../contexts/InstructionsContext";

const Home = () => {
	const { showInstructions, handleShowInstructions } =
		useContext(InstructionsContext);
	return (
			<div className="footer-margin">
				{showInstructions ? (
					<Instructions handleShowInstructions={handleShowInstructions} />
				) : null}
				<HomeHero />
				<HomeInstructions />
				<HomeProductView handleShowInstructions={handleShowInstructions} />
			</div>
	);
};

export default Home;
