const { Shopify } = require("@shopify/shopify-api");
const fetch = require('node-fetch')
const Client = require('shopify-buy')

const shopifyRestClient = new Shopify.Clients.Rest(
	process.env.SHOPIFY_STORE_URL,
	process.env.SHOPIFY_ACCESS_TOKEN
);
const storeFrontClient = new Shopify.Clients.Storefront(
	process.env.SHOPIFY_STORE_URL,
	process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN
)
const buyClient = Client.buildClient({
	domain: process.env.SHOPIFY_STORE_URL,
	storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN
},fetch)

module.exports = {
	client: shopifyRestClient,
	storeFrontClient: storeFrontClient,
	buyClient: buyClient
};
