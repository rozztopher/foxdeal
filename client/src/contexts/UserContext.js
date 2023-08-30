import React, { Component } from "react";
import dbClient from "../utils/dbClient";
const UserContext = React.createContext();

class UserProvider extends Component {
	state = {
		user: {},
		activeProduct: {},
		selectedProducts: [],
		selectedPartners: [],
		userCompletedTasks: [],
	};

	signIn = async (userInfo) => {
		this.setState({ user: userInfo });
		try {
			const response = await dbClient.get("/user/completedTasks", {
				headers: {
					"Content-Type": "application/json",
					Authorization: this.state.user.jwtToken,
				},
			});
			this.setState({ userCompletedTasks: response.data.tasks });
		} catch (error) {
			console.log("this.completedTasks--- error", error);
		}
	};

	updateUserCompletedTasks = async () => {
		try {
			const response = await dbClient.get("/user/completedTasks", {
				headers: {
					"Content-Type": "application/json",
					Authorization: this.state.user.jwtToken,
				},
			});
			this.setState({ userCompletedTasks: response.data.tasks });
		} catch (error) {
			console.log("this.completedTasks--- error", error);
		}
	};

	signOut = () => {
		this.setState({});
	};
	setActiveProduct = (product) => {
		this.setState({ activeProduct: product });
	};

	updateProducts = (product) => {
		let productList = [...this.state.selectedProducts];
		// if (this.state.selectedProducts.find(e => e.id === product.id)) {
		//     productList = productList.filter(e =>e.id !== product.id)
		// } else {
		//     productList.push(product)
		// }
		productList.push(product);
		this.setState({ selectedProducts: productList });
	};

	removeProduct = (product) => {
		let productList = [...this.state.selectedProducts];
		productList = productList.filter((e) => e.id !== product.id);
		this.setState({ selectedProducts: productList });
	};

	resetProducts = () => {
		this.setState({ selectedProducts: [] });
	};

	updatePartners = async (partner) => {
		let partnerList = Object.assign([], this.state.selectedPartners);
		if (this.state.selectedPartners.find(e => e.name === partner.name)) {
			partnerList  = partnerList.filter(e => e.name !== partner.name)
		} else {
			partnerList.push(partner);
		}
		this.setState({ selectedPartners: partnerList });
	};
	completedTask = async (partner) => {
		const resp = await dbClient.post(
			"/user/completedTasks",
			{
				taskId: partner.task.id,
				credits: partner.task.credits,
				action: "add",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: this.state.user.jwtToken,
				},
			}
		);
		this.state.user.credits = resp.data.credits;
	};

	render() {
		return (
			<UserContext.Provider
				value={{
					user: this.state.user,
					activeProduct: this.state.activeProduct,
					signIn: this.signIn,
					signOut: this.signOut,
					setActiveProduct: this.setActiveProduct,
					selectedProducts: this.state.selectedProducts,
					updateProducts: this.updateProducts,
                    removeProduct: this.removeProduct,
					resetProducts: this.resetProducts,
					completedTask: this.completedTask,
					userCompletedTasks: this.state.userCompletedTasks,
					updateUserCompletedTasks: this.updateUserCompletedTasks,
					selectedPartners: this.state.selectedPartners,
					updatePartners: this.updatePartners,
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

const UserConsumer = UserContext.Consumer;

export { UserConsumer, UserContext };

export default UserProvider;
