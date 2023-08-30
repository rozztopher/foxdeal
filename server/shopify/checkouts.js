const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env/") });
const { createStripeToken } = require("./stripe");
const { storeFrontClient } = require("./shopifyClient");
const { v4: uuidv4 } = require("uuid");

const {
	createCheckoutQueryString,
	createCompleteCheckoutQueryString,
	createAddLineItemToCheckoutQueryString,
	queryAavailableShippingRatesForCheckout,
	updateCheckoutShippingLine,
} = require("./query");

async function createCheckout(user, product_id) {
	let checkoutQueryString = createCheckoutQueryString(user, product_id);
	let checkout = await storeFrontClient.query({ data: checkoutQueryString });
	return checkout;
}

async function completeCheckout(checkout, user, card, amount) {
	try {
		const idempotencyKey = uuidv4();
		const stripeToken = (await createStripeToken(card)).id;
		const checkout_id = checkout.body.data.checkoutCreate.checkout.id;
		const handles = await queryAavailableShippingRatesForCheckout(checkout_id);
		await updateCheckoutShippingLine(checkout_id, handles[0]);
		let completeCheckoutQueryString = createCompleteCheckoutQueryString(
			stripeToken,
			checkout_id,
			user,
			amount,
			idempotencyKey
		);
		let completedCheckout = await storeFrontClient.query({
			data: completeCheckoutQueryString,
		});
		if (completedCheckout.body.data.errors) {
			console.log(completedCheckout.body.data.errors);
			throw new Error();
		}
		return completedCheckout;
	} catch (error) {
		return new Error("Error Creating Checkout.");
	}
}
async function addItemToCheckout(chekcout_id, variant_id) {
	let addLineItemQueryString = createAddLineItemToCheckoutQueryString(
		chekcout_id,
		variant_id
	);
	let data = await storeFrontClient.query({data:addLineItemQueryString})
	console.log(data.body)		
}
module.exports = {
	createCheckout,
	completeCheckout,
	addItemToCheckout,
};
