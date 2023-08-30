import { useContext } from "react";
import { NavigationContext } from "../../contexts/NavigationContext";
import { useState } from "react";
const ProgressBar = (props) => {
	const areSomeProductsSelected = props.selectedProducts.length > 0;
	const areSomePartnersSelected = props.selectedPartners.length > 0;
	const [expand, setExpand] = useState(false);
	const { navState, handleNavChange } = useContext(NavigationContext);
	const { from, to } = navState;
	return (
		<>
			<div
				className={`progress-bar${
					areSomeProductsSelected || areSomePartnersSelected
						? " progress-bar_with-expand"
						: ""
				}`}
			>
				{(to === "/products" && from !== "/partners") ||
				(to === "/partners" && from === "/products") ||
				(to === "/userdashboard" && from === "/partners") ? (
					<>
						<div className="progress-bar_item progress-bar_item-with-line">
							<div className="progress-bar_item-title">
								<p
									className={
										areSomeProductsSelected
											? "progress-bar_number progress-bar_item-previous"
											: "progress-bar_number progress-bar_item-current"
									}
								>
									1
								</p>
								<p
									className={
										areSomeProductsSelected
											? "progress-bar_item-previous-color"
											: "progress-bar_item-current-color"
									}
								>
									Select Product
								</p>
								<div className="progress-bar_line"></div>
							</div>
							{expand &&
								props.selectedProducts.map((product) => {
									return (
										<div className="progress-bar_product" key={product.id}>
											<img
												className="progress-bar_product-image"
												src={product.image.src}
												alt={product.title}
											></img>
											<p className="progress-bar_product-title">
												{product.title}
											</p>
										</div>
									);
								})}
						</div>

						<div className="progress-bar_item progress-bar_item-with-line">
							<div className="progress-bar_item-title">
								<p
									className={
										areSomePartnersSelected
											? "progress-bar_number progress-bar_item-previous"
											: from === "/products"
											? "progress-bar_number progress-bar_item-current"
											: "progress-bar_number"
									}
								>
									2
								</p>
								<p
									className={
										areSomePartnersSelected
											? "progress-bar_item-previous-color"
											: from === "/products"
											? "progress-bar_item-current-color"
											: ""
									}
								>
									Select Partner
								</p>
								<div className="progress-bar_line"></div>
							</div>
							{expand && (
								<div className="progress-bar_partner">
									{props.selectedPartners.map((partner) => {
										return (
											<div className="progress-bar_partner-item" key={partner.id}>
												<img
													className="progress-bar_product-image"
													src={partner.logo}
													alt={partner.title}
												></img>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</>
				) : (
					<>
						<div className="progress-bar_item progress-bar_item-with-line">
							<div className="progress-bar_item-title">
								<p
									className={
										areSomePartnersSelected
											? "progress-bar_number progress-bar_item-previous"
											: "progress-bar_number progress-bar_item-current"
									}
								>
									1
								</p>
								<p
									className={
										areSomePartnersSelected
											? "progress-bar_item-previous-color"
											: "progress-bar_item-current-color"
									}
								>
									Select Partner
								</p>
								<div className="progress-bar_line"></div>
							</div>
							{expand && (
								<div className="progress-bar_partner">
									{props.selectedPartners.map((partner) => {
										return (
											<div className="progress-bar_partner-item" key={partner.id}>
												<img
													className="progress-bar_product-image"
													src={partner.logo}
													alt={partner.title}
												></img>
											</div>
										);
									})}
								</div>
							)}
						</div>
						<div className="progress-bar_item progress-bar_item-with-line">
							<div className="progress-bar_item-title">
								<p
									className={
										areSomeProductsSelected
											? "progress-bar_number progress-bar_item-previous"
											: from === "/partners"
											? "progress-bar_number progress-bar_item-current"
											: "progress-bar_number"
									}
								>
									2
								</p>
								<p
									className={
										areSomeProductsSelected
											? "progress-bar_item-previous-color"
											: from === "/partners"
											? "progress-bar_item-current-color"
											: ""
									}
								>
									Select Product
								</p>
								<div className="progress-bar_line"></div>
							</div>
							{expand &&
								props.selectedProducts.map((product) => {
									return (
										<div className="progress-bar_product" key={product.id}>
											<img
												className="progress-bar_product-image"
												src={product.image.src}
												alt={product.title}
											></img>
											<p className="progress-bar_product-title">
												{product.title}
											</p>
										</div>
									);
								})}
						</div>
					</>
				)}
				<div className="progress-bar_item">
					<div className="progress-bar_item-title">
						<p
							className={
								areSomeProductsSelected &&
								areSomePartnersSelected &&
								to === "/userdashboard"
									? "progress-bar_number progress-bar_item-current"
									: "progress-bar_number"
							}
						>
							3
						</p>
						<p>Get delevered</p>
					</div>
				</div>
				{(areSomeProductsSelected || areSomePartnersSelected) && (
					<div
						className="progress-bar_expand"
						onClick={() => setExpand(!expand)}
					>
						<p>
							Show {expand ? "less" : "more"} information about the selected
							items
							{expand ? (
								<img src="/icons/show_less.svg" alt="Show less"></img>
							) : (
								<img src="/icons/show_more.svg" alt="Show more"></img>
							)}
						</p>
					</div>
				)}
			</div>
			<div className="progress-bar_divider"></div>
		</>
	);
};

export default ProgressBar;
