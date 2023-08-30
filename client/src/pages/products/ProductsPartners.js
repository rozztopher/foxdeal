import React, { useState, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { UserContext } from "../../contexts/UserContext";

function ProductsPartners(props) {
  const [hoveredPartner, setHoveredPartner] = useState("");
  const { selectedPartners, updatePartners, user } = useContext(UserContext);

  const handlePartnerHover = (e) => {
    setHoveredPartner(e.currentTarget.id);
  };

  const handlePartnerLeave = () => {
    setHoveredPartner("");
  };

  const handleSelectedPartner = (partner) => {
    if (Object.entries(user).length === 0)
      return document.getElementById("log-in").click();
    updatePartners(partner);
  };

  return (
    <div className="nested-partners-container" id="nested-partners-container">
      <div className="flex-edge">
        <h3 className="sub-header">Gönner</h3>
        <p className="grey-text caption-text">
          Anzahl der Gönner:{" "}
          <span className="grey-text bold">{props.partners.length}</span>
        </p>
      </div>
      <div className="horizontal-divider mt-8"></div>
      <div className="nested-partners-grid mt-23">
        {props.partners.map((partner) => {
          return (
            <div key={partner.name} className="partners-card-container">
              <div
                className="card-1"
                id={partner.name}
                onMouseEnter={handlePartnerHover}
                onMouseLeave={handlePartnerLeave}
                style={{
                  height: "12.5vw",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {partner.name === hoveredPartner && (
                  <>
                    <div className="inline justify-center">
                      <p className="bold text-center small-header">
                        {partner.name}&nbsp;&nbsp;
                      </p>
                      <img
                        src="/icons/info-icon.svg"
                        alt="info"
                        style={{ width: "10%" }}
                        data-tip="This is the task description that will be received from the description field as part of the task object in the PostgreSQL database."
                      ></img>
                      <div className="tool-tip-main">
                        <ReactTooltip
                          className="tooltip"
                          place="top"
                          type="light"
                          effect="solid"
                        />
                      </div>
                    </div>
                    <div className="horizontal-divider mt-18"></div>
                    <div
                      className={
                        selectedPartners.includes(partner)
                          ? "cta-button green fill-button skinny-button mt-13"
                          : "soft-blue-button fill-button skinny-button mt-13"
                      }
                      id={partner.name}
                      onClick={(e) => handleSelectedPartner(partner)}
                    >
                      {selectedPartners.includes(partner)
                        ? "Partner selected"
                        : "Gönner wählen"}
                    </div>
                  </>
                )}
                {partner.name !== hoveredPartner && (
                  <div>
                    <img
                      className="partner-logo"
                      src={partner.logo}
                      alt="logo"
                    />
                    <div className="bottom-info">
                      <p className="grey-text caption-text text-center">
                        Credits:{" "}
                        <span className="highlight caption-text">
                          {partner.task.credits}
                        </span>
                      </p>
                    </div>
                    {selectedPartners.includes(partner) && (
                      <div className="selected-circle">
                        <img
                          className="center-hv"
                          src="/icons/tick-icon.svg"
                          alt="tick"
                        ></img>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsPartners;
