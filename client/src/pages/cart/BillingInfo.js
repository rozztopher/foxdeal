import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import InputField from "../../components/InputField";
import { Country, City } from "country-state-city";
import { onBlurListener } from "./validators";

const BillingInfo = ({isCartValid, setIsCartValid}) => {
  const { user } = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone_number || "");
  const [country, setCountry] = useState(user.country || "CH");
  const [city, setCity] = useState(user.city || "");
  const [street, setStreet] = useState(user.street || "");
  const [zip, setZip] = useState(user.zip || "");
  
  const toggleEdit = (e) => {
    if (editable) {
      document.getElementById("fieldset").disabled = "disabled";
    } else {
      document.getElementById("fieldset").disabled = "";
    }
    setEditable(!editable);
  };

  const isBillingInfoCorrect = () => {
    let nameRe = /^(?!\s*$).+/g;
    let phoneRe = /^(\+41|0){1}\d{9}$/g;
    let streetRe = /^(?!\s*$).+/g;
    let zipRe = /^[1-9]{1}\d{3}$/g;
    
    let correctness = nameRe.test(name) &&
                      phoneRe.test(phone) &&
                      streetRe.test(street) &&
                      zipRe.test(zip)
    return correctness
  }

  useEffect(() => {
    let nameRe = /^(?!\s*$).+/g;
    let phoneRe = /^(\+41|0){1}\d{9}$/g;
    let streetRe = /^(?!\s*$).+/g;
    let zipRe = /^[1-9]{1}\d{3}$/g;
    let correctness = nameRe.test(user.name) &&
                      phoneRe.test(user.phone_number) &&
                      streetRe.test(user.street) &&
                      zipRe.test(user.zip)
    setIsCartValid(prevState => ({...prevState,isBillingInfoCorrect:correctness}))
  },[])

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
    setCountry(user.country || 'CH');
    setCity(user.city);
    setStreet(user.street);
    setZip(user.zip);
  }, [user]);
  
  useEffect(() => {
    setIsCartValid(prevState => ({...prevState,isBillingInfoCorrect:isBillingInfoCorrect()}))
  },[name,phone,street,zip])

  return (
    <div
      className={
        "billing-info-container" + (window.innerWidth <= 428 ? " mt-20" : "")
      }
    >
      <div className="flex-edge flo">
        <div>
          <h3 className="sub-header">Da wohn’ ich:</h3>
        </div>
        <div>
          {editable && (
            <div className="cta-blue-button wide-button" onClick={toggleEdit}>
              <div className="inline justify-center">
                <p className="white-text body-text">Save changes</p>
                <img
                  className="gap-left-05"
                  src="/icons/pencil-icon-white.svg"
                  alt="pencil"
                ></img>
              </div>
            </div>
          )}
          {!editable && (
            <div className="inline pointer" onClick={toggleEdit}>
              <p className="med-text hyperlink">Informationen bearbeiten</p>
              <img
                className="gap-left-1"
                src="/icons/pencil-icon.svg"
                alt="pencil"
              ></img>
            </div>
          )}
        </div>
      </div>
      <form className="mt-30" onBlur={onBlurListener}>
        <fieldset
          className="cart-billing-form"
          id="fieldset"
          disabled="disabled"
        >
          <div className="small-inputs-grid">
            <InputField
              name={"Vor & Nachname"}
              value={name}
              set={setName}
              icon={"/icons/form-name-icon.svg"}
            />
            <InputField
              name={"Handynummer"}
              value={phone}
              set={setPhone}
              icon={"/icons/form-phone-icon.svg"}
            />
            <div className="mt-22">
              <label className="grey-text price-tex">Land</label>
              <div>
                <select
                  className="form-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {Country.getAllCountries().map((country) => {
                    return (
                      <option value={country.isoCode}>{country.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mt-22">
              <label className="grey-text price-text">Stadt</label>
              <div>
                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {City.getCitiesOfCountry(country).map((city) => {
                    return <option value={city.name}>{city.name}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-22" />
          <InputField
            name={"Strasse & Hausnummer"}
            value={street}
            set={setStreet}
            icon={"/icons/form-address-icon.svg"}
          />
          <div className="mt-22" />
          <InputField name={"Postleitzahl"} value={zip} set={setZip} />
        </fieldset>
      </form>
    </div>
  );
};

export default BillingInfo;
