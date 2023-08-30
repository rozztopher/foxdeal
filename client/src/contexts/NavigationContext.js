import React from "react";
import { useState } from "react";
export const NavigationContext = React.createContext();

function NavigationProvider(props) {
	const [navState, setNavState] = useState({ from: "/", to: "/" });
	
	const handleNavChange = (nav) => {
		setNavState({ from:nav.from, to:nav.to });
	};
	return (
		<NavigationContext.Provider value={{ navState, handleNavChange }}>
			{props.children}
		</NavigationContext.Provider>
	);
}

export default NavigationProvider;
