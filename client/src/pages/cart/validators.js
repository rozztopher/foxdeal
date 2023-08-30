export function onBlurListener(e) {
	let inputElement = e.target;
	if (inputElement.type === "radio" || inputElement.type === "checkbox") return;
	let inputValue = inputElement.value;
	let id = inputElement.id;
	switch (id) {
		case "Vor & Nachname": {
			let re = /^(?!\s*$).+/g;
			validateInputValue(re, inputElement, inputValue);
			break;
		}
		case "Telefonnummer":
		case "Handynummer": {
			let re = /^(\+41|0){1}\d{9}$/g;
			validateInputValue(re, inputElement, inputValue);
			break;
		}
		case "Strasse & Hausnummer": {
			let re = /^(?!\s*$).+/g;
			validateInputValue(re, inputElement, inputValue);
			break;
		}
		case "Postleitzahl": {
			let re = /^[1-9]{1}\d{3}$/g;
			validateInputValue(re, inputElement, inputValue);
			break;
		}
		case "Kartnennummer": {
			let visaRe = /^4[0-9]{12}(?:[0-9]{3})?$/g,
				mastercardRe = /^5[1-5][0-9]{14}$/g;
			inputValue = inputValue.replace(/\s/g, "");
			if (inputValue.startsWith("4"))
				validateInputValue(visaRe, inputElement, inputValue);
			else validateInputValue(mastercardRe, inputElement, inputValue);
			break;
		}
		case "Ablaufdatum": {
			let re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/g;
			validateInputValue(re, inputElement, inputValue);
			break;
		}
		case "CVC/CVV": {
			let re = /^[0-9]{3,4}$/g;
			validateInputValue(re, inputElement, inputValue);
			break;
		}
		case "Mail": {
			let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
			validateInputValue(re, inputElement, inputValue);
			break;
		}
		default:
			break;
	}
}

function validateInputValue(re, inputeElement, value) {
	if (!re.test(value)) {
		inputeElement.classList.add("invalid_input");
	} else {
		if (inputeElement.classList.contains("invalid_input")) {
			inputeElement.classList.remove("invalid_input");
		}
	}
}
