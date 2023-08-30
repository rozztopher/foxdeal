import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { StoreContext } from "../../contexts/StoreContext";
import { NavigationContext } from "../../contexts/NavigationContext";

const HomeProductView = ({ handleShowInstructions }) => {
	const { setActiveProduct } = useContext(UserContext);
	const { fetchAllProducts, products } = useContext(StoreContext);
	const { navState, handleNavChange } = useContext(NavigationContext);

	useEffect(() => {
		fetchAllProducts();
		return () => {};
	}, [fetchAllProducts]);

	const bannerSrc =
		window.innerWidth <= 576
			? "/images/banner-mobile.png"
			: "/images/banner-image.png";

	if (products.length) {
		return (
			<div className="home-products mt-85">
				<h3>
					<span className="body-text highlight">Alle</span> Produkte
				</h3>
				<Link
					style={{ textDecoration: "none" }}
					to="/products"
					id="products-link"
				>
					<div className="home-banner mt-24">
						<img src={bannerSrc} alt="banner" style={{ width: "100%" }}></img>
					</div>
				</Link>
				{window.innerWidth > 576 && (
					<div className="home-product-grid mt-30">
						{products.map((product) => {
							return (
								<div
									key={product.title}
									className="card-1 transparent-fade single-product-grid"
									id={product.title}
								>
									<div className="flex-vertical-3">
										<p className="small-header">{product.title}</p>
										<div className="horizontal-divider mt-6"></div>
										<div className="flex-edge mt-9">
											<p className="grey-text body-text">Preis:</p>
											<p className="grey-text body-text">
												<span className="chf">CHF </span>
												{product.variants[0].price}
											</p>
										</div>
										<div className="flex-edge">
											<p className="bold body-text">Stabil:</p>
											<p className="highlight bold body-text">
												<span className="chf">CHF </span>
												{Math.floor(product.variants[0].price / 2)}.00
											</p>
										</div>
										<div
											style={{ textDecoration: "none" }}
											to="/instructions"
											id="products-link"
											onClick={(e) => handleShowInstructions(true)}
										>
											<div
												className="soft-blue-button bw-216 mt-11"
												onClick={() => {
													setActiveProduct(product);
													handleNavChange({ from: "/", to: "/products" });
												}}
											>
												mehr Infos
											</div>
										</div>
									</div>
									<img src={product.images[0].src} alt="apple watch"></img>
								</div>
							);
						})}
					</div>
				)}
				{window.innerWidth <= 576 && (
					<div className="home-product-grid mt-30">
						{products.map((product) => {
							return (
								<div
									key={product.title}
									className="card-1 nested-product-card padding-15"
									id={product.title}
								>
									<div className="product-header">
										<p className="mt-21 body-text bold">{product.title}</p>
										<img
											className="yeet"
											src={product.images[0].src}
											alt="apple watch"
										></img>
									</div>
									<div className="horizontal-divider mt-9"></div>
									<div className="flex-edge mt-9">
										<p className="grey-text price-text">Preis:</p>
										<p className="grey-text price-text">
											<span className="chf">CHF </span>
											{product.variants[0].price}
										</p>
									</div>
									<div className="flex-edge">
										<p className="price-text bold">Stabil:</p>
										<p className="highlight price-text bold">
											<span className="chf">CHF </span>
											{Math.floor(product.variants[0].price / 2)}.00
										</p>
									</div>
									<Link
										style={{ textDecoration: "none" }}
										to="/products"
										id="products-link"
									>
										<div
											className="soft-blue-button fill-button mt-11"
											onClick={() => setActiveProduct(product)}
										>
											mehr Infos
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				)}
				<div className="flex-edge flo mt-30">
					<p className="grey-text body-text">Du siehst 6 alle 6 Produkte</p>
					<Link style={{ textDecoration: "none" }} to="/products">
						<div className="cta-button blue bw-205">Ich will alles sehen</div>
					</Link>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default HomeProductView;
