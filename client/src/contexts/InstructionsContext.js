import React, { Component } from "react";
import { withRouter } from "react-router-dom";
const InstructionsContext = React.createContext();

class InstructionsProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInstructions: false,
		};
	}

	handleShowInstructions = () => {
		const isFirstVisit = JSON.parse(localStorage.getItem("isFirstVisit"));
		if (isFirstVisit === null) {
			this.setState({ showInstructions: true });
		} else {
			this.setState({ showInstructions: false });
			this.props.history.push("/products");
		}
		localStorage.setItem("isFirstVisit", "false");
	};

	render() {
		return (
			<InstructionsContext.Provider
				value={{
					showInstructions: this.state.showInstructions,
					handleShowInstructions: this.handleShowInstructions,
				}}
			>
				{this.props.children}
			</InstructionsContext.Provider>
		);
	}
}

const InstructionsConsumer = InstructionsContext.Consumer;

export { InstructionsConsumer, InstructionsContext };

export default withRouter(InstructionsProvider);
