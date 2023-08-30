import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { useEffect } from "react";

function SigninForm(params) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showWarning, setShowWarning] = useState(false);
	const navigate = useNavigate();
	const { isUserAuthentecated, setIsUserAuthentecated } =
		useContext(AuthContext);

	const handleUsernameChange = (e) => {
		checkForWarning();
		let value = e.target.value;
		setUsername(value);
	};
	const handlePasswordChange = (e) => {
		checkForWarning();
		let value = e.target.value;
		setPassword(value);
	};
	const checkForWarning = () => {
		if (showWarning) setShowWarning(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				"/auth",
				{},
				{
					auth: {
						username,
						password,
					},
				}
			)
			.then((res) => {
				checkForWarning();
				if (res.status === 200) {
					setIsUserAuthentecated(true)
					navigate("dashboard", { replace: true });
				}
			})
			.catch((err) => {
				setShowWarning(true);
			});
	};
	useEffect(() => {});
	return (
		<div className="w-50 p-3 m-auto mt-5">
			<Form>
				<Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={username}
						onChange={handleUsernameChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
			{showWarning && (
				<div class="alert alert-danger mt-4" role="alert">
					Invalid credentials
				</div>
			)}
		</div>
	);
}

export default SigninForm;
