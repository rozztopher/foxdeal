import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../contexts/StoreContext";
import { UserContext } from "../../contexts/UserContext";
import { NavigationContext } from "../../contexts/NavigationContext";
import { Link } from "react-router-dom";
import ProgressBar from "../products/ProgressBar";
import PartnerInfoDialog from "./PartnerInfoDialog";

function Partners(props) {
	const [sort, setSort] = useState("alphabet");
	const { fetchAllPartners, partners, sortPartners } = useContext(StoreContext);
	const { user, selectedProducts, selectedPartners, updatePartners } =
		useContext(UserContext);
	const [hoveredPartner, setHoveredPartner] = useState("");
	const [showPartnerInfo, setShowPartnerInfo] = useState(false);
	const [partnerToShow, setPartnerToShow] = useState(null);
	useEffect(() => {
		fetchAllPartners(user.id);
	}, [user]);
	const { navState, handleNavChange } = useContext(NavigationContext);
	const { from, to } = navState;

	const handlePartnerHover = (partner) => {
		setHoveredPartner(partner.id);
	};

	const handlePartnerLeave = () => {
		setHoveredPartner("");
	};
	const handleClose = () => {
		setShowPartnerInfo(false);
	};
	const handleShowPartner = (partner) => {
		setPartnerToShow(partner);
		setShowPartnerInfo(true);
	};

	return (
		<div className="partners-page-container footer-margin">
			<ProgressBar
				selectedProducts={selectedProducts}
				selectedPartners={selectedPartners}
				location={props.location}
			/>
			<div className="flex-edge flo">
				<div>
					<p className="partner_credits">
						Credits you will get in total:{" "}
						<span className="partner_credits-red">
							{selectedPartners.reduce((acc, e) => acc + e.task.credits, 0)}
						</span>
					</p>
				</div>

				<Link
					style={{
						textDecoration: "none",
						pointerEvents: selectedPartners.length > 0 ? "all" : "none",
					}}
					to={{
						pathname: from === "/products" ? "/userdashboard" : "/products",
						state: { from: props.location.pathname },
					}}
					id="ud-link"
				>
					<div
						className={
							selectedPartners.length > 0
								? "cta-button red bw-229"
								: "button-disabled bw-229"
						}
						onClick={
							selectedPartners.length > 0
								? () =>
										handleNavChange({
											from: "/partners",
											to: from === "/products" ? "/userdashboard" : "/products",
										})
								: null
						}
					>
						<div className="inline justify-center">
							<p
								className="white-text body-text bold"
								style={{ letterSpacing: "initial" }}
							>
								Schnapp’ dir deinen Deal
							</p>
							<img
								className="gap-left-05 white-text"
								src="/icons/right-arrow-icon.svg"
								alt="arrow"
							></img>
						</div>
					</div>
				</Link>
			</div>
			<div className="horizontal-divider mt-30"></div>
			<div className="partner-list-grid mt-30">
				{partners.map((partner) => {
					return (
						<div
							key={partner.name}
							className="partners-card-container"
							onMouseMove={() => handlePartnerHover(partner)}
							onMouseLeave={() => handlePartnerLeave()}
						>
							{selectedPartners.find((e) => e.name === partner.name) &&
							partner.id !== hoveredPartner ? (
								<div className="select_mark">
									<img src="/images/select_mark.svg" alt="select mark"></img>
								</div>
							) : null}
							{partner.id === hoveredPartner ? (
								<div className="partner">
									<div className="partner_title">
										<p className="bold text-center small-header">
											{partner.name}
										</p>
										<img
											className="partner_info"
											src="/icons/info-icon.svg"
											alt="info icon"
											onClick={() => handleShowPartner(partner)}
										></img>
									</div>
									<div className="partner_points">
										<p className="partner_points-number">
											{partner.task.credits}
										</p>
										<p className="partner_points-text">Credits you will get</p>
									</div>

									{selectedPartners.find((e) => e.name === partner.name) ? (
										<div
											className="soft-green-button fill-button skinny-button mt-13"
											onClick={() => updatePartners(partner)}
										>
											Partner Selected
										</div>
									) : (
										<div
											className="soft-blue-button fill-button skinny-button mt-13"
											onClick={() => updatePartners(partner)}
										>
											Select Partner
										</div>
									)}
									<img
										className="partner-logo"
										src={partner.logo}
										alt="logo"
										style={{ opacity: 0, display: "none" }}
									></img>
								</div>
							) : (
								<div>
									<img
										className="partner-logo"
										src={partner.logo}
										alt="logo"
									></img>
								</div>
							)}
						</div>
					);
				})}
			</div>
			<PartnerInfoDialog
				open={showPartnerInfo}
				handleClose={handleClose}
				partner={partnerToShow}
			/>
		</div>
	);
}

export default Partners;
