import { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function Edit(props) {
	const { isUserAuthentecated } =
		useContext(AuthContext);
	return isUserAuthentecated ? (
		<h1>this is the edit page</h1>
	) : (
		<Navigate to="/"></Navigate>
	);
}

export default Edit;
