const { storeFrontClient } = require("./shopifyClient");

// this will create a checkout
//
function createCheckoutQueryString(user, product_id) {
	const queryString = `mutation {
	checkoutCreate(input: {
		lineItems: [{ variantId: "${product_id}", quantity: 1 }],
		email:"${user.email}",
		shippingAddress: {
			firstName: "${user.firstName}",
			lastName: "${user.lastName}",
			address1: "${user.address}",
			country: "${user.country}",
			zip: "${user.zip}",
			city: "${user.city}"
		}
	}) {
		checkout {
		id
		webUrl
		lineItems(first: 5) {
			edges {
			node {
				title
				quantity
			}
			}
		}
		}
		checkoutUserErrors {
			code 
			field
			message
		}
	}
	}
	`;
	return queryString;
}

// this will complete a checkout
//
function createCompleteCheckoutQueryString(
	stripe_token,
	checkout_id,
	user,
	amount,
	idempotencyKey
) {
	let queryString = `mutation { checkoutCompleteWithTokenizedPaymentV3(checkoutId: "${checkout_id}",payment: {
						paymentAmount: {
							amount: "${amount}",
							currencyCode: CHF
						},
						 billingAddress: {
							firstName: "${user.firstName}",
							lastName: "${user.lastName}",
							address1: "${user.address}",
							country: "${user.country}",
							zip: "${user.zip}",
							city: "${user.city}"
						 },
						test:true,
						idempotencyKey: "${idempotencyKey}",
						type: SHOPIFY_PAY,
						paymentData: "${stripe_token}"
						}
					)
					{
					checkout {
						id
					}
					checkoutUserErrors {
						code
						field
						message
					}
					payment {
						id
					}
				}
		}`;
	return queryString;
}
// this will add Line items to the checkout
//
function createAddLineItemToCheckoutQueryString(checkout_id, variant_id) {
	let queryString = `
	checkoutLineItemsAdd(checkoutId: "${checkout_id}", lineItems:{
		customAttributes:{key:"${variant_id}",value:"${variant_id}"},quantity:"1",variantId :"${variant_id}"}) {
				checkout {
					id
					lineItems{
						quantity
						title
						variant
					}
				}
				checkoutUserErrors {
					code
					field
					message
				}
			  }
	`;
	return queryString;
}
// this will query for availabe shipping rates for a given checkout
//
async function queryAavailableShippingRatesForCheckout(checkout_id) {
	let query = `
		{
			node(id: "${checkout_id}") {
				... on Checkout {
				id
				webUrl
				availableShippingRates {
					ready
					shippingRates {
					handle
					priceV2 {
						amount
					}
					title
					}
				}
				}
			}
		}
	`;
	const data = await storeFrontClient.query({ data: query });
	return await data.body.data.node.availableShippingRates.shippingRates.map(
		(e) => e.handle
	);
}

// this will update the shipping line for a given checkout
//
async function updateCheckoutShippingLine(checkout_id, shipping_handle) {
	let query = `
        mutation {
            checkoutShippingLineUpdate(checkoutId: "${checkout_id}",shippingRateHandle:"${shipping_handle}")
                {
                    checkout {
                        id
                    }
                    checkoutUserErrors {
                        code
                        field
                        message
                    }
                }
        }`;
	await storeFrontClient.query({ data: query });
}

module.exports = {
	createCheckoutQueryString,
	createCompleteCheckoutQueryString,
	createAddLineItemToCheckoutQueryString,
	queryAavailableShippingRatesForCheckout,
	updateCheckoutShippingLine,
};
