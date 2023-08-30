import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const UserDashboardPartners = (props) => {
  const {updateUserCompletedTasks} = useContext(UserContext)
  const handlePartnerActivation = () => {
    if (props.selectedPartners.length) {
      props.setPartnersComplete(true);
    }
  };
  const handlePartnerTask = (partner) => {
    let win = window.open();
    let iframeSource = partner.task.taskUrl
      ? partner.task.taskUrl
      : "https://acc01-www.sanitas.com/partnerwidget/?bundleId=foxdeal1&displayMode=wide&language=de&theme=darkgreen";
    win.document.write(
      `<iframe width= ${window.screen.width} height=${window.screen.height} src="${iframeSource}" style="background: #006400;"  frameborder="0" allowfullscreen></iframe>`
    );
    props.completedTask(partner);
    console.log(partner)
    setTimeout(() => {
      updateUserCompletedTasks()
    }, 2000);
    let index = props.selectedPartners.indexOf(partner);
    props.selectedPartners.splice(index, 1);
  };

  return (
    <div className="ud-select-products-container mt-30" id="ud-partners">
      <div className="flex-edge mt-30">
        <div>
          <p className="sub-header">2. Gönner wählen</p>
        </div>
        <div className="completed-chip chip-flex align-items-center bw-229">
          <p
            className={
              props.partnersComplete
                ? "green-text price-text bold"
                : "grey-text price-text bold"
            }
          >
            {props.partnersComplete ? "Komplett" : "Unvollständig"}
          </p>
          <div
            className={
              props.partnersComplete
                ? "completed-icon-container-green"
                : "completed-icon-container-grey"
            }
          >
            <img
              className="center-hv"
              src={
                props.partnersComplete
                  ? "/icons/tick-icon.svg"
                  : "/icons/cross-icon.svg"
              }
              alt="cross"
            ></img>
          </div>
        </div>
      </div>
      <div className="card-grid-3 mt-50">
        {props.selectedPartners.map((partner) => {
          return (
            <div
              className="card-1"
              key={partner.id}
              style={{ position: "relative" }}
              onClick={() => handlePartnerTask(partner)}
            >
              <div>
                <img src={partner.logo} alt="partner"></img>
                <div className="bottom-info">
                  <p className="grey-text caption-text">
                    Credits:{" "}
                    <span className="highlight">{partner.task.credits}</span>
                  </p>
                </div>
                <div className="selected-circle">
                  <img
                    className="center-hv"
                    src="/icons/tick-icon.svg"
                    alt="tick"
                    style={{ width: "50%" }}
                  ></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="horizontal-divider mt-28"></div>
      {window.innerWidth > 576 && (
        <div className="flex-edge flo mt-50">
          <Link
            style={{ textDecoration: "none" }}
            to="/products"
            id="products-link"
          >
            <div className="outline-button bw-184">Gönner ändern</div>
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <p className="grey-text caption-text">
              ausgewählte Gönner: {props.selectedPartners.length}
            </p>
            <div className="vertical-divider gap-left-35"></div>
            {!props.partnersComplete && (
              <div
                className="cta-button blue bw-214 gap-left-35"
                onClick={handlePartnerActivation}
              >
                Gönner aktivieren
              </div>
            )}
            <div className="mt-30"></div>
          </div>
        </div>
      )}
      {window.innerWidth <= 576 && (
        <div className="mt-15">
          <p className="grey-text caption-text text-center">
            ausgewählte Gönner: {props.selectedPartners.length}
          </p>
          <Link
            style={{ textDecoration: "none", width: "100%" }}
            to="/products"
            id="products-link"
          >
            <div className="outline-button fill-button mt-15">
              Gönner ändern
            </div>
          </Link>
          <div className="horizontal-divider mt-15"></div>
          {!props.partnersComplete && (
            <div
              style={{ width: "100%" }}
              className="cta-button blue fill-button mt-15"
              onClick={handlePartnerActivation}
            >
              Gönner aktivieren
            </div>
          )}
          <div className="mt-20"></div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPartners;
