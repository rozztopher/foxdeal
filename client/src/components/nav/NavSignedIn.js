import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationContext } from "../../contexts/NavigationContext";
import { UserContext } from "../../contexts/UserContext";

function NavSignedIn() {
	const navStyle = {
		textDecoration: "none",
	};

	const { selectedProducts, user } = useContext(UserContext);
	const { navState, handleNavChange } = useContext(NavigationContext);
	const location = useLocation();

	const [isTabletMenuOpen, setTabletMenuOpen] = useState(false);

	useEffect(() => {
		document.addEventListener("click", (e) => {
			const t = e.target;
			if (
				!t.closest(".tablet-user-dropdown") &&
				isTabletMenuOpen &&
				!t.className.includes("outline-button")
			) {
				setTabletMenuOpen(false);
			}
		});
	}, [isTabletMenuOpen]);

	const cartStyle = selectedProducts.length
		? "cart-amount"
		: "cart-amount mask";
	const nameArray = user.name.split(" ");

	const TabletDropdown = () => {
		return (
			<div className="tablet-user-dropdown">
				<div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
					<div className="user-icon">
						<p className="center-hv white-text">
							{nameArray[0].charAt(0) + nameArray[1].charAt(0)}
						</p>
					</div>
					<p className="body-text bold gap-left-12">{user.name}</p>
				</div>
				<Link style={navStyle} to="/userdashboard">
					<div
						className="mt-20"
						style={{ position: "relative", display: "flex", gap: "1rem" }}
						onClick={() => setTabletMenuOpen(!isTabletMenuOpen)}
					>
						<img src="/icons/user-grey.svg" alt="user" />
						<p>User Dashboard</p>
					</div>
				</Link>
				<div className="horizontal-divider mt-22" />
				<div
					className="mt-22"
					style={{ position: "relative", display: "flex", gap: "1rem" }}
					onClick={() => setTabletMenuOpen(!isTabletMenuOpen)}
				>
					<img src="/icons/door.svg" alt="door" />
					<p>Sign Out</p>
				</div>
			</div>
		);
	};

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
			<div className="vertical-divider"></div>
			<div className="sign-in-buttons">
				<div className="outline-button flex-edge-padded bw-184">
					<p className="body-text bold">
						Dein Score: <span className="highlight">{user.credits}</span>
					</p>
					<img src="/icons/info-icon.svg" alt="info"></img>
				</div>
				{window.innerWidth >= 1200 && (
					<Link style={navStyle} to="/userdashboard">
						<div
							className="outline-button bw-210 flex-edge-padded"
							onClick={() =>
								handleNavChange({
									from: location.pathname,
									to: "/userdashboard",
								})
							}
						>
							<div
								style={{
									display: "inline-flex",
									alignItems: "center",
									marginLeft: "-10px",
								}}
							>
								<div className="user-icon">
									<p className="center-hv white-text">
										{nameArray[0].charAt(0) + nameArray[1].charAt(0)}
									</p>
								</div>
								<p className="body-text bold gap-left-12">{user.name}</p>
							</div>
							<img src="/icons/down-chevron-icon.svg" alt="down chevron"></img>
						</div>
					</Link>
				)}
				{window.innerWidth < 1200 && (
					<div
						className="outline-button bw-66"
						style={{
							position: "relative",
							display: "flex",
							justifyContent: "space-evenly",
						}}
						onClick={() => setTabletMenuOpen(!isTabletMenuOpen)}
					>
						<img src="/icons/user-icon.svg" alt="down chevron"></img>
						<img src="/icons/down-chevron-icon.svg" alt="down chevron"></img>
					</div>
				)}
			</div>
			{isTabletMenuOpen && <TabletDropdown />}
		</div>
	);
}

export default NavSignedIn;
