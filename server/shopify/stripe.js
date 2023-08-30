const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env/") });
const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);

async function createStripeToken(card) {
	try {
		const token = await stripe.tokens.create({
			card: {
				number: card.number,
				exp_month: card.expairy_month,
				exp_year: card.expairy_year,
				cvc: card.cvc,
			},
		});
		if (token.id) return token;
	} catch (error) {
    // Hide the original Error and throw an ambigous one
		throw new Error("Invalid Card");
	}
}

module.exports = { createStripeToken };
