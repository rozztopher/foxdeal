import React from "react";
import { Link } from "react-router-dom";

const UserDashboardProducts = (props) => {
  return (
    <div className="ud-select-products-container mt-30" id="ud-products">
      <div className="flex-edge mt-30">
        <div>
          <p className="sub-header">1. Lieblingsprodukt aussuchen</p>
        </div>
        <div className="completed-chip chip-flex align-items-center bw-229">
          <p
            className={
              props.selectedProducts.length
                ? "green-text price-text bold"
                : "grey-text price-text bold"
            }
          >
            {props.selectedProducts.length ? "Komplett" : "Unvollständig"}
          </p>
          <div
            className={
              props.selectedProducts.length
                ? "completed-icon-container-green"
                : "completed-icon-container-grey"
            }
          >
            <img
              className="center-hv"
              src="/icons/tick-icon.svg"
              alt="tick"
            ></img>
          </div>
        </div>
      </div>
      {props.selectedProducts.map((product) => {
        return (
          <div className={window.innerWidth > 576 ? "" : "mt-12"} key={product.id}>
            {window.innerWidth > 576 && (
              <div className="ud-product-overview-container mt-38" key={product.id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p className="small-header">{product.title}</p>
                  <div className="horizontal-divider mt-11"></div>
                  <div className="flex-edge mt-9">
                    <p className="grey-text caption-text">Preis:</p>
                    <p className="grey-text caption-text">
                      <span className="chf">CHF </span>
                      {product.price}
                    </p>
                  </div>
                  <div className="flex-edge">
                    <p className="caption-text">Stabil:</p>
                    <p className="highlight small-header">
                      <span className="chf">CHF </span>
                      {Math.floor(product.price / 2)}.00
                    </p>
                  </div>
                </div>
                <img src={product.image.src} alt="product"></img>
                <img
                  src={product.image.src || product.image.src}
                  alt="product"
                ></img>
                <img
                  src={
                    product.image.src
                  }
                  alt="product"
                ></img>
              </div>
            )}
            {window.innerWidth <= 576 && (
              <div className="card-1">
                <div className="col-grid-3">
                  <img src={product.images[0].src} alt="product"></img>
                  <img
                    src={product.images[1].src || product.images[0].src}
                    alt="product"
                  ></img>
                  <img
                    src={
                      product.images[2].src ||
                      product.images[1].src ||
                      product.images[0].src
                    }
                    alt="product"
                  ></img>
                </div>
                <p className="small-header mt-11">{product.name}</p>
                <div className="horizontal-divider mt-13"></div>
                <div className="flex-edge mt-9">
                  <p className="grey-text caption-text">Preis:</p>
                  <p className="grey-text caption-text">
                    <span className="chf">CHF </span>
                    {product.variants[0].price}
                  </p>
                </div>
                <div className="flex-edge">
                  <p className="caption-text">Stabil:</p>
                  <p className="highlight small-header">
                    <span className="chf">CHF </span>
                    {Math.floor(product.variants[0].price / 2)}.00
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {window.innerWidth > 576 && (
        <div>
          <div className="horizontal-divider mt-28"></div>
          <div className="flex-edge flo mt-50 align-items-center">
            <Link
              style={{ textDecoration: "none" }}
              to="/products"
              id="products-link"
            >
              <div className="outline-button bw-184">Produkte ändern</div>
            </Link>
            <p className="grey-text caption-text">ausgewählte Produkte: 1</p>
          </div>
          <div className="mt-30"></div>
        </div>
      )}
      {window.innerWidth <= 576 && (
        <div>
          <div className="horizontal-divider mt-28"></div>
          <p className="grey-text caption-text mt-15 text-center">
            ausgewählte Produkte: 1
          </p>
          <div className="flex-edge flo mt-15 align-items-center">
            <Link
              style={{ textDecoration: "none", width: "100%" }}
              to="/products"
              id="products-link"
            >
              <div className="outline-button fill-button">Produkte ändern</div>
            </Link>
          </div>
          <div className="mt-20"></div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardProducts;
