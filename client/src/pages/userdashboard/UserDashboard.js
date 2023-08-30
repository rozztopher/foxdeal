import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { StoreContext } from "../../contexts/StoreContext";
import Steps from "./Steps";
import PersonalInformation from "./PersonalInformation";
import UserDashboardProducts from "./UserDashboardProducts";
import UserDashboardPartners from "./UserDashboardPartners";
import { Link } from "react-router-dom";
import ProgressBar from "../products/ProgressBar";

const UserDashboard = (props) => {
	const { user, selectedProducts, selectedPartners, completedTask } =
		useContext(UserContext);
	const { checkout } = useContext(StoreContext);
	const [partnersComplete, setPartnersComplete] = useState(false);

	const buttonSize = window.innerWidth > 576 ? "bw-194" : "fill-button";
	const bottomMargin = window.innerWidth > 576 ? "mt-50" : "mt-30";

	return (
		<>
			<ProgressBar
				selectedProducts={selectedProducts}
				selectedPartners={selectedPartners}
				location={props.location}
			></ProgressBar>
			<div className="ud-grid footer-margin">
				<Steps />
				<div className="ud-content">
					<PersonalInformation user={user} />
					<UserDashboardProducts selectedProducts={selectedProducts} />
					<UserDashboardPartners
						partnersComplete={partnersComplete}
						setPartnersComplete={setPartnersComplete}
						selectedPartners={selectedPartners}
						completedTask={completedTask}
					/>
					<div className={"horizontal-divider " + bottomMargin}></div>
					<div className={"flex-edge flo " + bottomMargin}>
						<div>
							<p className="sub-header">
								Gesamtbetrag: <span className="chf">CHF </span>199
							</p>
						</div>
						<div className="completed-chip">
							<Link
								style={{ textDecoration: "none" }}
								to="/cart"
								id="cart-link"
							>
								<div
									className={
										selectedProducts.length && partnersComplete
											? "cta-button red " + buttonSize
											: "button-disabled " + buttonSize
									}
									style={{ marginTop: window.innerWidth > 576 ? 0 : "20px" }}
								>
									Deal!
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserDashboard;
