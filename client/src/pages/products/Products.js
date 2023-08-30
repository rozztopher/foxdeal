import React, { useState, useContext, useEffect } from "react";
import ProductsGrid from "./ProductsGrid";
import { Link, useLocation } from "react-router-dom";
import ProductFilterMenu from "./ProductFilterMenu";
import { UserContext } from "../../contexts/UserContext";
import { StoreContext } from "../../contexts/StoreContext";
import { gsap } from "gsap";
import Instructions from "../instructions/Instructions";
import ProgressBar from "./ProgressBar";
import { InstructionsContext } from "../../contexts/InstructionsContext";
import { NavigationContext } from "../../contexts/NavigationContext";

function Products(props) {
	const [expandedProduct, setExpandedProduct] = useState({});
	const [dealLinkStatus, setDealLinkStatus] = useState("disabled");
	const [isBackToProductsHovered, setIsBackToProductsHovered] = useState(false);
	const {
		user,
		activeProduct,
		setActiveProduct,
		selectedProducts,
		selectedPartners,
	} = useContext(UserContext);
	const { fetchAllPartners } = useContext(StoreContext);
	const { showInstructions, handleShowInstructions } =
		useContext(InstructionsContext);
	const { navState, handleNavChange } = useContext(NavigationContext);
	const { from, to } = navState;
	// const location = useLocation();
	// const from = location?.state?.from;
	// console.log(from);
	let productsActive = true;

	const handleBackToProductsEnter = () => {
		setIsBackToProductsHovered(true);
	};
	const handleBackToProductsLeave = () => {
		setIsBackToProductsHovered(false);
	};

	const getDealLinkStatus = () => {
		if (!user.name) {
			setDealLinkStatus("sign-in");
		} else if (selectedProducts.length) {
			setDealLinkStatus("active");
		} else {
			setDealLinkStatus("disabled");
		}
	};

	useEffect(() => {
		fetchAllPartners(user.id);
		const product = Object.assign({}, activeProduct);
		setExpandedProduct(product);
		getDealLinkStatus();
	}, [activeProduct, setActiveProduct, dealLinkStatus, user, selectedProducts]);
	useEffect(() => {
		handleShowInstructions();
	}, []);
	const switchGrid = () => {
		if (productsActive) {
			if (document.getElementById("active-product-panel")) {
				gsap.timeline().set(".active-product-panel", { display: "none" });
			} else {
				gsap.timeline().set(".nested-products-grid", { display: "none" });
			}
			gsap.timeline().set("#view-all", { display: "none" });
			gsap.timeline().set(".nested-partners-container", { display: "initial" });
		} else {
			if (document.getElementById("active-product-panel")) {
				gsap.timeline().set(".active-product-panel", { display: "block" });
			} else {
				gsap.timeline().set(".nested-products-grid", { display: "grid" });
			}
			gsap.timeline().set("#view-all", { display: "initial" });
			gsap.timeline().set(".nested-partners-container", { display: "none" });
		}
		productsActive = !productsActive;
	};

	const mobileSwitch = document.getElementById("mobile-switch");
	if (mobileSwitch) {
		mobileSwitch.addEventListener("click", switchGrid);
	}

	const backToProductsSrc = isBackToProductsHovered
		? "/icons/left-arrow-active-icon.svg"
		: "/icons/left-arrow-icon.svg";
	let dealButtonClass = "button-disabled bw-229";
	if (dealLinkStatus !== "disabled") {
		if (dealLinkStatus === "sign-in") {
			if (selectedPartners.length) {
				dealButtonClass = "cta-button red bw-229";
			} else {
				dealButtonClass = "button-disabled bw-229";
			}
		} else {
			dealButtonClass = "cta-button red bw-229";
		}
	}
	return (
		<div className="footer-margin">
			{showInstructions ? (
				<Instructions handleShowInstructions={handleShowInstructions} />
			) : null}
			<ProgressBar
				selectedProducts={selectedProducts}
				selectedPartners={selectedPartners}
				location={props.location}
			/>
			<div className="flex-edge">
				{!expandedProduct.title && <ProductFilterMenu />}
				{expandedProduct.title && (
					<div
						className="outline-button bw-263"
						onClick={() => {
							setActiveProduct({});
							setExpandedProduct({});
						}}
						onMouseEnter={handleBackToProductsEnter}
						onMouseLeave={handleBackToProductsLeave}
					>
						<div className="inline justify-center">
							<img src={backToProductsSrc} alt="arrow"></img>
							<p
								className="gap-left-1 body-text bold"
								style={{ letterSpacing: "initial" }}
							>
								Back to all products
							</p>
						</div>
					</div>
				)}
				<Link
					style={{
						textDecoration: "none",
						pointerEvents: dealLinkStatus === "active" ? "all" : "none",
					}}
					to={{
						pathname: from === "/partners" ? "/userdashboard" : "/partners",
						state: { from: props.location.pathname },
					}}
					id="ud-link"
				>
					<div
						className={dealButtonClass}
						onClick={() =>
							handleNavChange({
								from: "/products",
								to: from === "/partners" ? "/userdashboard" : "/partners",
							})
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
			<div className="products-partners-grid mt-38">
				<div>
					<ProductsGrid
						setActiveProduct={setExpandedProduct}
						expandedProduct={expandedProduct}
						key={expandedProduct.title}
					/>
					{!expandedProduct.title && (
						<div className="flex-edge flo mt-30" id="view-all">
							<p className="grey-text body-text">Du siehst 6 alle 6 Produkte</p>
							<Link style={{ textDecoration: "none" }} to="/products">
								<div className="cta-button blue bw-205">
									Ich will alles sehen
								</div>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Products;
