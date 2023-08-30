function parseCustomerCard(cart_info) {
	const cardNumber = cart_info.cardNumber.replace(/\s/g, "");
	const cvc = cart_info.cvc;
	const [expairy_month, expairy_year] = cart_info.expiryDate.split("/");
	return { cardNumber, expairy_month, expairy_year, cvc };
}

function parseCustomerPersonalInfo(user) {
	const email = user.email;
	const [firstName, lastName] = user.name.split(" ");
	const country = user.country;
	const city = user.city;
	const zip = user.zip;
	const address = user.street;
	return { email, firstName, lastName, country, city, zip, address };
}
module.exports = {
	parseCustomerCard,
	parseCustomerPersonalInfo,
};
