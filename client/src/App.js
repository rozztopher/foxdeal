import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Partners from "./pages/partners/Partners";
import Nav from "./components/nav/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import StoreContext from "./contexts/StoreContext";
import InstructionsProvider from "./contexts/InstructionsContext";
import NavigationProvider from "./contexts/NavigationContext";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import Cart from "./pages/cart/Cart";
import ThankYou from "./pages/thankyou/ThankYou";
import BG from "./components/BG";
import "./css_main.scss";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [adminUsername, setAdminUsername] = useState("");
	const [adminPassword, setAdminPassword] = useState("");

	const nameChange = (e) => {
		setAdminUsername(e.target.value);
	};

	const passChange = (e) => {
		setAdminPassword(e.target.value);
	};

	const enterSite = () => {
		if (adminUsername === "foxdeal" && adminPassword === "fd21") {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	};

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function ScrollReset() {
		const { pathname } = useLocation();

		useEffect(() => {
			window.scrollTo(0, 0);
		}, [pathname]);

		return null;
	}

	if (isLoggedIn) {
		return (
			<StoreContext>
				<UserContext>
					<Router>
						<NavigationProvider>
							<InstructionsProvider>
								<div className="app">
									<Nav/>
									<BG />
									<div className="scroll-up" onClick={scrollToTop}>
										<img src="/icons/up.svg" alt="up arrow"></img>
									</div>
									<div
										style={{
											position: "absolute",
											top: 0,
											left: 0,
											height: "100vh",
											width: "100vw",
											zIndex: 10,
											pointerEvents: "none",
										}}
									>
										<div className="mobile-switch" id="mobile-switch">
											<p>Select Partners</p>
											<img
												src="/icons/right-arrow-icon.svg"
												alt="right arrow"
											></img>
										</div>
									</div>
									<ScrollReset />
									<div className="app-container">
										<Switch>
											<Route path="/" exact component={Home} />
											<Route path="/products" component={Products} />
											<Route path="/partners" component={Partners} />
											<Route path="/cart" component={Cart} />
											<Route path="/userdashboard" component={UserDashboard} />
											<Route path="/thankyou" component={ThankYou} />
										</Switch>
									</div>
								</div>
								<Footer></Footer>
							</InstructionsProvider>
						</NavigationProvider>
					</Router>
				</UserContext>
			</StoreContext>
		);
	} else {
		return (
			<div className="center-hv">
				<div>
					<label htmlFor="admin-username">Username</label>
					<input
						className="form-input"
						id="admin-user-name"
						onChange={nameChange}
					></input>
				</div>
				<div className="gap-top-4">
					<label htmlFor="admin-password">Password</label>
					<input
						className="form-input"
						id="admin-password"
						onChange={passChange}
					></input>
				</div>
				<div
					className="cta-red-button gap-top-4 center-h fill-button"
					onClick={enterSite}
				>
					Sign in
				</div>
			</div>
		);
	}
}

export default App;
