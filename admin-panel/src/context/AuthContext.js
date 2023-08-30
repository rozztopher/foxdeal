import React, { useState } from "react";
export const AuthContext = React.createContext({
	isUserAuthentecated: false,
	setIsUserAuthentecated: () => {},
});

const AuthProvider = ({ children }) => {
	const [isUserAuthentecated, setIsUserAuthentecated] = useState(false);
	return (
		<AuthContext.Provider
			value={{ isUserAuthentecated, setIsUserAuthentecated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
