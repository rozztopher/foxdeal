import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { StoreContext } from "../../contexts/StoreContext";
import Signup from "../singin_signup/Signup";
function ProductsGrid(props) {
	const [textExpanded, setTextExpanded] = useState(false);
	const [productImages, setProductImages] = useState(
		props.activeProduct ? props.activeProduct.images : []
	);
	const [productVariant, setProductVariant] = useState(
		Object.keys(props.expandedProduct).length > 0
			? props.expandedProduct.variants[0]
			: { price: "1000" }
	);
	const { user, selectedProducts, updateProducts } = useContext(UserContext);
	const { fetchAllProducts, products, addItemToCheckout } =
		useContext(StoreContext);
	//continue from here and replace options

	let options =
		Object.keys(props.expandedProduct).length > 0
			? props.expandedProduct.variants[0].selectedOptions
			: [];
	let optionProperty =
		Object.keys(props.expandedProduct).length > 0
			? Object.fromEntries(options.map((option) => [option.name, option.value]))
			: {};
	const [selectedOptions, setSelectedOptions] = useState(optionProperty);
	const [openSignUp, setOpenSignUp] = useState(false);
	useEffect(() => {
		fetchAllProducts();
		return () => {};
	}, [fetchAllProducts, productImages]);

	useEffect(() => {
		if (Object.keys(props.expandedProduct).length > 0) {
			let productOptions = props.expandedProduct.variants[0].selectedOptions;
			let objectState = productOptions.reduce((acc, e) => {
				acc = { ...acc, [e.name]: e.value };
				return acc;
			}, {});
			setSelectedOptions(objectState);
			props.expandedProduct.variants[0].selectedOptions.forEach((option) => {
				let inputElement = document.getElementById(`${option.value}`);
				inputElement.classList.add("options-item-active");
			});
			Object.entries(selectedOptions).forEach((n) => {
				let firstPropertyName = n[0];
				let firstPropertyValue = n[1];
				let otherPropertyNames = Object.keys(selectedOptions).filter(
					(e) => e !== firstPropertyName
				);
				otherPropertyNames.forEach((propertyName) => {
					let labels = document.querySelectorAll(`#${propertyName} label`);
					labels.forEach((label) => {
						let variant = findVarinat(
							firstPropertyName,
							firstPropertyValue,
							propertyName,
							label
						);
						if (!variant) {
							label.classList.add("unavilable");
						}
					});
				});
			});
		}
	}, []);

	const findVarinat = (firstKey, firstValue, propertyName, label) => {
		let variants = props.expandedProduct.variants;
		let variant = variants.find((e) => {
			let selectedOptions = e.selectedOptions;
			let names = selectedOptions.map((n) => n.name);
			let values = selectedOptions.map((n) => n.value);

			return (
				names.includes(firstKey) &&
				names.includes(propertyName) &&
				values.includes(firstValue) &&
				values.includes(label.id)
			);
		});
		return variant;
	};

	useEffect(() => {
		if (Object.keys(props.expandedProduct).length > 0) {
			let variants = props.expandedProduct.variants;
			let variant = variants.find((e) => {
				let variantOption = e.selectedOptions;
				return variantOption.every(
					(option) =>
						Object.keys(selectedOptions).includes(option.name) &&
						Object.values(selectedOptions).includes(option.value)
				);
			});
			setProductVariant(variant);
		}
	}, [selectedOptions]);
	const fillImages = () => {
		const length = props.expandedProduct.images.length;
		const newList = Object.assign([], props.expandedProduct.images);
		let counter = 0;
		while (newList.length < 6) {
			newList.push(props.expandedProduct.images[counter]);
			if (counter === length - 1) {
				counter = 0;
			} else {
				counter = counter + 1;
			}
		}
		setProductImages(newList);
	};

	const rotateArray = (direction) => {
		const newList = [];
		if (direction === "next") {
			for (let i = 1; i < productImages.length; i++) {
				newList.push(productImages[i]);
			}
			newList.push(productImages[0]);
		} else {
			newList.push(productImages[productImages.length - 1]);
			for (let i = 0; i < productImages.length - 1; i++) {
				newList.push(productImages[i]);
			}
		}
		setProductImages(newList);
	};

	const expandText = () => {
		const elements = document.getElementsByClassName("product-desc");
		for (let i = 0; i < elements.length; i++) {
			if (textExpanded) {
				elements.item(i).style.overflow = "hidden";
				elements.item(i).style.height = "25.25px";
				document.getElementById("expand-p").innerHTML = "Show more...";
				setTextExpanded(false);
			} else {
				elements.item(i).style.overflow = "none";
				elements.item(i).style.height = "auto";
				document.getElementById("expand-p").innerHTML = "Show less...";
				setTextExpanded(true);
			}
		}
	};

	const handleOpenSignUp = () => {
		setOpenSignUp(false);
		setTimeout(() => {
			setOpenSignUp(true);
		}, 100);
	};
	const handleOptionsSelection = (key, value, e) => {
		let variants = props.expandedProduct.variants;
		let otherProperties = Object.keys(selectedOptions).filter((e) => e !== key);
		let propertyToInputsMapping = otherProperties.map((property) => ({
			[property]: Array.from(document.querySelectorAll(`#${property} input`)),
		}));
		propertyToInputsMapping.forEach((mapping) => {
			const property = Object.keys(mapping)[0];
			const inputs = Object.values(mapping)[0];
			inputs.forEach((input) => {
				let variant = variants.find((e) => {
					let otherSelectedOptions = e.selectedOptions;
					let names = otherSelectedOptions.map((n) => n.name);
					let values = otherSelectedOptions.map((n) => n.value);
					return (
						names.includes(key) &&
						values.includes(value) &&
						names.includes(property) &&
						values.includes(input.value)
					);
				});
				if (input.parentElement.classList.contains("unavilable")) {
					input.parentElement.classList.remove("unavilable");
				}
				if (!variant) {
					input.parentElement.classList.add("unavilable");
				}
			});
		});
		setSelectedOptions((state) => ({ ...state, [key]: value }));
		let parentElement = e.target.parentElement;
		let childrenElements = Array.from(parentElement.children);
		childrenElements.forEach((e) => {
			e.classList.remove("options-item-active");
		});
		e.target.classList.add("options-item-active");
	};

	const addToCart = () => {
		updateProducts(productVariant);
		addItemToCheckout(productVariant.id, 1);
	};
	if (productImages.length < 6 && props.expandedProduct.title) {
		fillImages();
	}
	const isProductSelected = selectedProducts.some(
		(e) => e.id === productVariant.id
	);

	if (props.expandedProduct.title && products.length && productImages.length) {
		return (
			<div className="active-product-panel" id="active-product-panel">
				{window.innerWidth > 576 && (
					<>
						<div className="col-grid-2">
							{openSignUp ? (
								<Signup openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
							) : null}
							<div className="image-frame">
								<img
									className="p-image"
									src={productImages[0].src}
									alt="watch"
								></img>
								<div className="col-grid-6 mt-14">
									<div
										className="image-frame small-image"
										onClick={() => rotateArray("prev")}
									>
										<img
											className="center-hv"
											src="/icons/left-arrow-icon.svg"
											alt="arrow"
										></img>
									</div>
									<div className="image-frame">
										<img
											className="p-image"
											src={productImages[2].src}
											alt="watch"
										></img>
									</div>
									<div className="image-frame">
										<img
											className="p-image"
											src={productImages[3].src}
											alt="watch"
										></img>
									</div>
									<div className="image-frame">
										<img
											className="p-image"
											src={productImages[4].src}
											alt="watch"
										></img>
									</div>
									<div className="image-frame">
										<img
											className="p-image"
											src={productImages[5].src}
											alt="watch"
										></img>
									</div>
									<div
										className="image-frame small-image"
										onClick={() => rotateArray("next")}
									>
										<img
											className="center-hv"
											src="/icons/right-arrow-blue-icon.svg"
											alt="arrow"
										></img>
									</div>
								</div>
							</div>
							<div className="image-frame">
								<p className="mt-26 title">{props.expandedProduct.title}</p>
								<p className="grey-text mt-21 price-text">
									die geilsten Features
								</p>
								{JSON.parse(props.expandedProduct.description).features.map(
									(feature) => {
										return (
											<p key={feature} className="mt-9 body-text">
												<span className="highlight bold">• </span>&nbsp;
												{feature}
											</p>
										);
									}
								)}
								<p className="grey-text mt-23 price-text">
									Das Produkt erklärt:
								</p>
								<p className="body-text mt-8">
									{JSON.parse(props.expandedProduct.description).description}
								</p>
								<div className="expand-container mt-6" onClick={expandText}>
									<p className="body-text hyperlink" id="expand-p">
										Zeig’ mehr...
									</p>
								</div>
								{props.expandedProduct.options.map((option,i) => {
									return (
										<React.Fragment key={i}>
											<p className="grey-text mt-23 price-text">
												{option.name}
											</p>
											<div className="options-container" id={option.name}>
												{option.values.map((value,i) => (
													<label
														key={i}
														id={value.value}
														className="options-label"
														htmlFor={value.value}
														onClick={(e) =>
															handleOptionsSelection(
																option.name,
																value.value,
																e
															)
														}
													>
														{value.value}
														<input
															className="options-hidden"
															value={value.value}
															name={value.value}
														></input>
													</label>
												))}
											</div>
										</React.Fragment>
									)
								})}

								<div className="product-selection-bar">
									<div className="product-selection-bar-content">
										<div className="product-selection-bar-prices">
											<p className="grey-text body-text strike">
												CHF{productVariant.price}
											</p>
											<p className="ml-18 highlight small-header">
												CHF
												{Math.floor(productVariant.price / 2)}
												.00
											</p>
										</div>
										{Object.keys(user).length === 0 ? (
											<div
												onClick={handleOpenSignUp}
												className="cta-button blue bw-135 cta-text mt-20 nounderline"
											>
												Ja, ich will!
											</div>
										) : (
											<div
												className={
													isProductSelected
														? "cta-button green bw-135 cta-text mt-20"
														: "cta-button blue bw-135 cta-text mt-20"
												}
												id={props.expandedProduct.title}
												onClick={() => addToCart()}
											>
												{isProductSelected ? "Select Again" : "Ja, ich will!"}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				{window.innerWidth <= 576 && (
					<div className="col-grid-1">
						<div className="image-frame">
							<img
								className="p-image"
								src={productImages[0].src}
								alt="watch"
							></img>
						</div>
					</div>
				)}
				{window.innerWidth <= 576 && (
					<div className="col-grid-5 mt-14">
						<div
							className="image-frame small-image"
							onClick={() => rotateArray("prev")}
						>
							<img
								className="center-hv"
								src="/icons/left-arrow-icon.svg"
								alt="arrow"
							></img>
						</div>
						<div className="image-frame">
							<img
								className="center-hv"
								src={productImages[2].src}
								alt="watch"
							></img>
						</div>
						<div className="image-frame">
							<img
								className="center-hv"
								src={productImages[3].src}
								alt="watch"
							></img>
						</div>
						<div className="image-frame">
							<img
								className="center-hv"
								src={productImages[4].src}
								alt="watch"
							></img>
						</div>
						<div
							className="image-frame small-image"
							onClick={() => rotateArray("next")}
						>
							<img
								className="center-hv"
								src="/icons/right-arrow-blue-icon.svg"
								alt="arrow"
							></img>
						</div>
					</div>
				)}

				<div
					className={
						window.innerWidth <= 576
							? "col-grid-1 justify-left"
							: "col-grid-2 justify-left"
					}
				></div>
				<div className="mt-20"></div>

				{window.innerWidth <= 576 && (
					<div className="product-selection-bar">
						<div className="gradient-separator"></div>
						<div className="big-bottom-info">
							<div className="inline justify-center force-column mt-20">
								<p className="grey-text highlight-text strike">
									CHF{props.expandedProduct.variants[0].price}
								</p>
								<p className="highlight sub-header">
									CHF{Math.floor(props.expandedProduct.variants[0].price / 2)}
									.00
								</p>
							</div>
							<div className="horizontal-divider mt-13"></div>
							<div
								className={
									selectedProducts.includes(props.expandedProduct)
										? "cta-button green fill-button b-mobile-height body-text mt-20"
										: "cta-button blue fill-button b-mobile-height body-text mt-20"
								}
								id={props.expandedProduct.name}
								onClick={() => addToCart()}
							>
								{selectedProducts.includes(props.expandedProduct)
									? "Product selected"
									: "Ja, ich will!"}
							</div>
							<div className="mt-20"></div>
						</div>
					</div>
				)}
			</div>
		);
	} else if (products.length) {
		return (
			<div className="nested-products-grid" id="nested-products-grid">
				{products.map((product) => {
					return (
						<div
							key={product.id}
							className="card-1 transparent-fade nested-product-card padding-15 flex-edge-vertical"
						>
							<div className="product-header">
								<div className="mt-21 body-text bold">{product.title}</div>
								<div className="p-image">
									{" "}
									<img
										className="yeet"
										src={product.images[0].src}
										alt="apple watch"
									></img>
								</div>
							</div>
							<div>
								<div className="horizontal-divider mt-9"></div>
								<div className="flex-edge mt-9">
									<p className="grey-text price-text">Preis:</p>
									<p className="grey-text price-text">
										CHF{product.variants[0].price}
									</p>
								</div>
								<div className="flex-edge">
									<p className="price-text bold">Stabil:</p>
									<p className="highlight price-text bold">
										CHF{Math.floor(product.variants[0].price / 2)}.00
									</p>
								</div>
								<div
									className="soft-blue-button fill-button mt-12"
									onClick={() => props.setActiveProduct(product)}
									id={product.title}
								>
									mehr infos
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	} else return <div></div>;
}

export default ProductsGrid;
