const { buyClient } = require("../shopify/shopifyClient");
/*
 * Get All Products.
 */
exports.all = async (req, res) => {
	let products = await buyClient.product.fetchAll();
	return res.json([...products.filter(e => !e.hasOwnProperty('fieldBaseTypes'))])
};
/*
 * Get Product by id.
 */
exports.get = async (req, res) => {};
