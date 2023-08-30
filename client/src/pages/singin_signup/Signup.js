import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import SignUpDialog from "../../components/nav/SignUpDialog";
import SignInDialog from "../../components/nav/SignInDialog";
import { gsap } from "gsap";
import dbClient from "../../utils/dbClient";

function Signup(props) {
	const { user, signIn } = useContext(UserContext);
	const [signUpOpen, setSignUpOpen] = useState(
		Boolean(props.openSignUp) || false
	);
	const [signInOpen, setSignInOpen] = useState(false);
	const [yPos, setYPos] = useState(0);
	const [error, setError] = useState(0);

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

	const register = async (name, email, password) => {
		try {
			const response = await dbClient.post("/auth/register", {
				name: name,
				email: email,
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
						handleSignUpClose();
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

	return (
		<>
			<SignInDialog
				open={signInOpen}
				switchDialog={handleSignUpOpen}
				signIn={signIn}
				handleClose={handleSignInClose}
				login={login}
			/>
			<SignUpDialog
				open={signUpOpen}
				switchDialog={handleSignInOpen}
				signIn={signIn}
				handleClose={handleSignUpClose}
				register={register}
				error={error}
			/>
		</>
	);
}

export default Signup;
