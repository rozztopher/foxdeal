import React, { useState, useContext, useEffect } from "react";
import { onBlurListener } from "../cart/validators";
import { gsap } from "gsap";
import { UserContext } from "../../contexts/UserContext";
import { Country, City } from "country-state-city";
import dbClient from "../../utils/dbClient";
import InputField from "../../components/InputField";
const { DateTime } = require("luxon");

const PersonalInformation = (props) => {
  const { user, signIn } = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  let dob = new Date(user.dob);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [day, setDay] = useState(dob.getDate());
  const [month, setMonth] = useState(dob.getMonth() + 1);
  const [year, setYear] = useState(dob.getFullYear());
  const [country, setCountry] = useState(user.country || "CH");
  const [city, setCity] = useState(user.city || "");
  const [street, setStreet] = useState(user.street || "");
  const [zip, setZip] = useState(user.zip || "");
  let userInfo = {name:user.name,email:user.email,phone:user.phone,street:user.street,zip:user.zip}

  const [arePersonInfoValid,setArePersonInfoValid] = useState({
    name:true,
    email:true,
    phone:false,
    street:false,
    zip:false
  })

  let nameRegex = /^(?!\s*$).+/g
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
  let phoneRegex = /^(\+41|0){1}\d{9}$/g
  let zipRegex = /^[1-9]{1}\d{3}$/g

  const [isFormValid,setIsFormValid] = useState(false)

  useEffect(()  => {
    setArePersonInfoValid(prevState => ({
      ...prevState,
      name: nameRegex.test(name),
    }))
  },[name])

  useEffect(()  => {
    setArePersonInfoValid(prevState => ({
      ...prevState,
      email: emailRegex.test(email),
    }))
  },[email])

  useEffect(() => {
    setArePersonInfoValid(prevState => ({
      ...prevState,
      phone: phone !== userInfo.phone && phoneRegex.test(phone),
      street: street !== userInfo.street && nameRegex.test(street),
      zip: zip !== userInfo.zip && zipRegex.test(zip)
    }))
   
  },[phone,street,zip])
  
  const verifyInput = (key,value) => {
      switch(key){
        case 'phone':
          return phoneRegex.test(value);
        case 'street':
          return nameRegex.test(value);
        case 'zip':
          return zipRegex.test(value);
        default:
          return false;
      }
  }

  useEffect(() => {
    let userTempInfo = {phone,street,zip}
    let obj = Object.fromEntries(Object.entries(userTempInfo).filter(([k,v]) => v))
    let validationObj = Object.fromEntries(Object.entries(obj).map(([k,v]) => [k,verifyInput(k,v)] ))
    setIsFormValid(arePersonInfoValid.name && arePersonInfoValid.email && Object.values(validationObj).every(e => e) )

  },[arePersonInfoValid])
  
  const days = [];
  const months = [];
  const years = [];

  for (let i = 1; i <= DateTime.local(year, month).daysInMonth; i++) {
    days.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  for (let i = 1900; i <= 2021; i++) {
    years.push(i);
  }

  useEffect(() => {
    if (day > DateTime.local(year, month).daysInMonth) {
      setDay(1);
    }
  }, [day, month, year, country]);

  useEffect(() => {
    dob = new Date(user.dob);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setDay(dob.getDate());
    setMonth(dob.getMonth() + 1);
    setYear(dob.getFullYear());
    setCountry(user.country);
    setCity(user.city);
    setStreet(user.street);
    setZip(user.zip);
  }, [user]);
  

  
  const expandPanel = (e) => {
    const tl = gsap.timeline({ onComplete: () => setExpanded(!expanded) });
    const sizes =
      window.innerWidth > 576 ? ["320px", "701px"] : ["200px", "800px"];
    if (expanded) {
      tl.to(".ud-pi", { duration: 0.33, height: sizes[0] });
      document.getElementById("expand-text").innerHTML = "Zeig’ mehr";
      document.getElementById("more-info-icon").src =
        "/icons/down-chevron-icon.svg";
    } else {
      tl.to(".ud-pi", { duration: 0.33, height: sizes[1] });
      document.getElementById("expand-text").innerHTML = "zuklappen";
      document.getElementById("more-info-icon").src =
        "/icons/up-chevron-icon.svg";
    }
  };

  const toggleEdit = (e) => {
    if (editable) {
      document.getElementById("fieldset").disabled = "disabled";
      updateUser();
    } else {
      document.getElementById("fieldset").disabled = "";
    }
    setEditable(!editable);
  };

  const updateUser = async () => {
    const dob = Date(`${year}/${month}/${day}`);
    const updatedUser = {
      name,
      email,
      phone,
      dob,
      country,
      city,
      street,
      zip,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: user.jwtToken,
    };
    try {
      const response = await dbClient.put("/user", updatedUser, {
        headers: headers,
      });
      let updateUser = response.data.user;
      updateUser.jwtToken = user.jwtToken;
      signIn(updateUser);
    } catch (err) {
      console.log(err);
    }
  };

  const onFormInputChange = (e) => {
    onBlurListener(e)
   
  } 

  return (
    <div className="ud-pi" id="personal-info">
      <div className="flex-edge flo">
        <div>
          <p className="sub-header">Meine Informationen</p>
        </div>
        <div>
          {editable && (
            <div className={`cta-button edit-button`.concat( isFormValid ? ' blue' : ' grey')} onClick={toggleEdit}>
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
              <p className="body-text hyperlink">Edit information</p>
              <img
                className="gap-left-05"
                src="/icons/pencil-icon.svg"
                alt="pencil"
              ></img>
            </div>
          )}
        </div>
      </div>
      <form className="mt-40" onChange={onFormInputChange}>
        <fieldset className="ud-pi-form" disabled="disabled" id="fieldset">
          <InputField
            name={"Vor & Nachname"}
            value={name}
            set={setName}
            icon={"/icons/form-name-icon.svg"}
          />
          <InputField
            name={"Mail"}
            value={email}
            set={setEmail}
            icon={"/icons/form-email-icon.svg"}
          />
          <InputField
            name={"Telefonnummer"}
            value={phone}
            set={setPhone}
            icon={"/icons/form-phone-icon.svg"}
          />
          <div>
            <label className="grey-text price-text" htmlFor="dob">
              Geburtsdatum
            </label>
            <div className="inline" style={{ justifyContent: "space-between" }}>
              <select
                className="form-select-3"
                id="dob"
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
              >
                {days.map((day) => {
                  return <option key={day} value={day}>{day}</option>;
                })}
              </select>
              <select
                className="form-select-3"
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
              >
                {months.map((month) => {
                  return <option key={month} value={month}>{month}</option>;
                })}
              </select>
              <select
                className="form-select-3"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
              >
                {years.map((year) => {
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="horizontal-divider form-full-width mt-27"></div>
          <div>
            <label className="grey-text price-text mt-22">Land</label>
            <div>
              <select
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {Country.getAllCountries().map((country) => {
                  return (
                    <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label className="grey-text price-text gap-top-2">Stadt</label>
            <div>
              <select
                className="form-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {City.getCitiesOfCountry(country).map((city,i) => {
                  return (
                    <option key={i} value={city.name} defaultValue={country}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-full-width">
            <InputField
              name={"Strasse & Hausnummer"}
              value={street}
              set={setStreet}
              icon={"/icons/form-address-icon.svg"}
            />
          </div>
          <InputField name={"Postleitzahl"} value={zip} set={setZip} />
        </fieldset>
      </form>
      <div className="bottom-info pointer" onClick={expandPanel}>
        <div className="inline justify-center">
          <p className="grey-text caption-text" id="expand-text">
            Zeig’ mehr
          </p>
          <img
            className="gap-left-05"
            id="more-info-icon"
            src="/icons/down-chevron-icon.svg"
            alt="down"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
