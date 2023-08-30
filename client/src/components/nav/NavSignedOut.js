import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationContext } from "../../contexts/NavigationContext";
import { UserContext } from "../../contexts/UserContext";

function NavSignedOut(props) {
	const navStyle = {
		textDecoration: "none",
	};

	const { selectedProducts } = useContext(UserContext);
	const { navState, handleNavChange } = useContext(NavigationContext);
	const location = useLocation();

	const cartStyle = selectedProducts.length
		? "cart-amount"
		: "cart-amount mask";

	return (
		<div className="right-nav">
			<Link style={navStyle} to="/cart">
				<div
					className="cart"
					onClick={() =>
						handleNavChange({ from: location.pathname, to: "/cart" })
					}
				>
					<div className={cartStyle}>
						<p className="center-hv cart-text white-text">
							{selectedProducts.length}
						</p>
					</div>
					<img src="/icons/cart-icon.svg" alt="cart icon"></img>
				</div>
			</Link>
			<div className="divider"></div>
			<div className="sign-in-buttons">
				<div
					className="outline-button bw-135"
					id="log-in"
					onClick={props.handleSignInOpen}
				>
					Log in
				</div>
				<div
					className="cta-button blue bw-135 gap-left-10"
					onClick={props.handleSignUpOpen}
				>
					Registrieren
				</div>
			</div>
		</div>
	);
}

export default NavSignedOut;
