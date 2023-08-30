import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import NavSignedOut from "./NavSignedOut";
import NavSignedIn from "./NavSignedIn";
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./SignInDialog";
import VerifyDialog from "./VerifyDialog";
import ThankYouDialog from "./ThankYouDialog";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { gsap } from "gsap";
import dbClient from "../../utils/dbClient";
import { NavigationContext } from "../../contexts/NavigationContext";

function Nav(props) {
	const { user, signIn, signOut } = useContext(UserContext);

	const navStyle = {
		textDecoration: "none",
	};

	const [signUpOpen, setSignUpOpen] = useState(false);
	const [signInOpen, setSignInOpen] = useState(false);
	const [verifyMobile, setVerifyMobile] = useState(false);
	const [thankYou, setThankYou] = useState(false);
	const [path, setPath] = useState("/");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [yPos, setYPos] = useState(0);
	const [error, setError] = useState(0);
	const [userInfo, setUserInfo] = useState({});
	const [forgotPassword, setForgotPassword] = useState(false);
	const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
	const [passwordResetJwt, setPasswordResetJwt] = useState({});
	const { navState, handleNavChange } = useContext(NavigationContext);
	const location = useLocation();

	if (window.innerWidth > 428) {
		window.addEventListener("wheel", () => {
			setYPos(window.scrollY);
		});
	}

	useEffect(() => {
		const tl = gsap.timeline({ onComplete: () => "did it bro" });
		if (yPos === 0) {
			tl.set(".nav-bar-container", {
				background:
					"linear-gradient(180deg, rgba(255, 255, 255, 0.7) -66.27%, rgba(255, 255, 255, 0) 100%)",
				border: "initial",
				boxShadow: "initial",
				backdropFilter: "initial",
			});
		} else {
			tl.set(".nav-bar-container", {
				background:
					"linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 100%)",
				border: "1px solid rgba(255, 255, 255, 0.5)",
				boxShadow: "box-shadow: 0px 14px 140px rgba(0, 0, 0, 0.05)",
				backdropFilter: "backdrop-filter: blur(100px)",
			});
		}
	}, [user]);

	const verifyMobileNumber = async (name, email, mobile, password) => {
		setUserInfo({ name, email, mobile, password });
		// send verification code
		try {
			let response = await dbClient.post("/auth/sendSms", { mobile, email });
			if (response.status === 200) {
				setSignUpOpen(false);
				setVerifyMobile(true);
			}
		} catch (err) {
			setError(
				err.response ? err.response.data.message : "E-Mail existiert bereits!"
			);
		}
	};
	const verifyEmail = async (email) => {
		try {
			let response = await dbClient.post("/auth/forgotPassword", { email });
			if (response.status === 200) {
				setPasswordResetJwt(response.data.passwordResetJwt);
				setForgotPassword(false);
				setResetPasswordOpen(true);
			}
		} catch (err) {
			setError(
				err.response ? err.response.data.message : "E-Mail existiert bereits!"
			);
		}
	};
	const resetPassword = () => {
		setSignInOpen(false);
		setForgotPassword(true);
	};
	const handlePasswordReset = async (newPassword) => {
		try {
			let response = await dbClient.post("/auth/resetPassword", {
				passwordResetJwt,
				newPassword,
			});
			if (response.status === 200) {
				setResetPasswordOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const register = async (code, name, email, mobile, password) => {
		try {
			const response = await dbClient.post("/auth/register", {
				code: code,
				name: name,
				email: email,
				mobile: mobile,
				password: password,
			});
			if (response.status === 200) {
				try {
					const res = await dbClient.post("/auth/login", {
						email: email,
						password: password,
					});
					if (res.data.user) {
						res.data.user.jwtToken = res.data.jwtToken;
						signIn(res.data.user);
						handleVerifyClose();
					}
				} catch (err) {
					err.response
						? setError(err.response.data.message)
						: setError("ungültige Zugangsdaten!");
				}
			}
		} catch (err) {
			setError(
				err.response ? err.response.data.message : "E-Mail existiert bereits!"
			);
		}
	};

	const login = async (email, password) => {
		try {
			const response = await dbClient.post("/auth/login", {
				email: email,
				password: password,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleSignUpOpen = () => {
		setError(null);
		setSignUpOpen(true);
	};

	const handleSignUpClose = () => {
		setError(null);
		setSignUpOpen(false);
	};

	const handleSignInOpen = () => {
		setSignInOpen(true);
	};

	const handleSignInClose = () => {
		setSignInOpen(false);
	};
	const handleVerifyClose = () => {
		setVerifyMobile(false);
		setThankYou(true);
	};
	const handleThankYouClose = () => {
		setThankYou(false);
	};
	const handleVerificationCode = (code) => {
		let name = userInfo.name;
		let email = userInfo.email;
		let mobile = userInfo.mobile;
		let password = userInfo.password;
		register(code, name, email, mobile, password);
	};
	const openMenu = () => {
		gsap.timeline().to(".mobile-menu-container", {
			duration: 1,
			left: mobileMenuOpen ? "-100%" : "0%",
		});
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const productStyle = {
		text: {
			color: path === "/products" ? "#1D1D1B" : "#777E90",
		},
		chip: {
			opacity: path === "/products" ? 1 : 0,
		},
	};

	const partnerStyle = {
		text: {
			color: path === "/partners" ? "#1D1D1B" : "#777E90",
		},
		chip: {
			opacity: path === "/partners" ? 1 : 0,
		},
	};

	const nameArray = user.name ? user.name.split(" ") : [];

	return (
		<div className="nav-bar-container">
			{window.innerWidth > 576 && (
				<nav>
					<div className="left-nav">
						<Link
							style={navStyle}
							to="/"
							className="logo-link"
							onClick={() => {
								setPath("/");
								handleNavChange({ from: location.pathname, to: "/" });
							}}
						>
							<img
								src="/images/logo.svg"
								alt="foxdeal logo"
								id="nav-logo"
							></img>
						</Link>
						<div className="divider hide"></div>
						<ul className="nav-links">
							<div
								className="nav-option"
								onClick={() => {
									setPath("/products");
									handleNavChange({
										from: location.pathname,
										to: "/products",
									});
								}}
							>
								<Link style={navStyle} to="/products" id="products-link">
									<li style={productStyle.text}>Produkte</li>
								</Link>
								<div className="nav-chip" style={productStyle.chip}></div>
							</div>
							<div className="ml-2"></div>
							<div
								className="nav-option"
								onClick={() => {
									setPath("/partners");
									handleNavChange({
										from: location.pathname,
										to: "/partners",
									});
								}}
							>
								<Link style={navStyle} to="/partners" id="partners-link">
									<li style={partnerStyle.text}>Gönner</li>
								</Link>
								<div className="nav-chip" style={partnerStyle.chip}></div>
							</div>
						</ul>
					</div>
					{user.name ? (
						<NavSignedIn />
					) : (
						<NavSignedOut
							handleSignUpOpen={handleSignUpOpen}
							handleSignInOpen={handleSignInOpen}
						/>
					)}
				</nav>
			)}
			{window.innerWidth <= 576 && (
				<div className="mobile-nav">
					<img
						src="/icons/hamburger-icon.svg"
						alt="menu"
						onClick={openMenu}
					></img>
					<Link style={navStyle} to="/" className="logo-link">
						<img src="/images/logo.svg" alt="foxdeal logo" id="nav-logo"></img>
					</Link>
					<Link style={navStyle} to="/cart" className="cart-link">
						<img src="/icons/cart-icon.svg" alt="cart"></img>
					</Link>
				</div>
			)}
			<div className="mobile-menu-container">
				<div className="mobile-nav">
					<img
						src="/icons/hamburger-icon.svg"
						alt="close"
						onClick={openMenu}
					></img>
					<Link
						style={navStyle}
						to="/"
						className="logo-link"
						onClick={openMenu}
					>
						<img src="/images/logo.svg" alt="foxdeal logo" id="nav-logo"></img>
					</Link>
				</div>
				<div className="horizontal-divider mt-16"></div>
				<div className="mobile-menu-content">
					<div>
						<Link style={navStyle} to="/products" onClick={openMenu}>
							<p className="title mt-85">Products</p>
						</Link>
						<Link style={navStyle} to="/partners" onClick={openMenu}>
							<p className="title mt-50">Partners</p>
						</Link>
					</div>
					{!user.name && (
						<div className="flex-edge">
							<div className="outline-button bw-140" onClick={handleSignInOpen}>
								Sign in
							</div>
							<div
								className="cta-button blue bw-140"
								onClick={handleSignUpOpen}
							>
								Sign up
							</div>
						</div>
					)}
					{user.name && (
						<div className="sub-container-flat">
							<div className="outline-button fill-button flex-edge-padded justify-center">
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
							</div>
							<div className="flex-edge mt-25">
								<p className="small-header">
									Your credits:{" "}
									<span className="highlight small-header">99</span>
								</p>
								<img src="/icons/info-icon.svg" alt="info"></img>
							</div>
							<div className="horizontal-divider mt-30"></div>
							<Link style={navStyle} to="/userdashboard">
								<div className="inline mt-30">
									<img src="/icons/user-grey-icon.svg" alt="user"></img>
									<p className="grey-text small-header gap-left-20">
										User dashboard
									</p>
								</div>
							</Link>
							<div className="inline mt-38" onClick={signOut}>
								<img src="/icons/exit-icon.svg" alt="exit"></img>
								<p className="grey-text small-header gap-left-20">Sign out</p>
							</div>
						</div>
					)}
				</div>
			</div>
			<SignInDialog
				open={signInOpen}
				switchDialog={handleSignUpOpen}
				signIn={signIn}
				handleClose={handleSignInClose}
				login={login}
				resetPassword={resetPassword}
			/>
			<SignUpDialog
				open={signUpOpen}
				switchDialog={handleSignInOpen}
				signIn={signIn}
				handleClose={handleSignUpClose}
				verifyMobileNumber={verifyMobileNumber}
				register={register}
				error={error}
			/>
			<VerifyDialog
				open={verifyMobile}
				mobile={userInfo.mobile}
				handleClose={handleVerifyClose}
				handleVerificationCode={handleVerificationCode}
			/>
			<ThankYouDialog
				open={thankYou}
				handleThankYouClose={handleThankYouClose}
			/>
			<ForgotPassword
				open={forgotPassword}
				verifyEmail={verifyEmail}
				error={error}
			/>
			<ResetPassword
				open={resetPasswordOpen}
				handlePasswordReset={handlePasswordReset}
			/>
		</div>
	);
}

export default Nav;
