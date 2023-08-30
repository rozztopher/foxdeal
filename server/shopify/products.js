const {storeFrontClient} = require('./shopifyClient')

async function getProductById(product_id) {
	const data = await storeFrontClient.query({
		data: `query{
					product(id: "${product_id}") {
						title
						variants(first:3){
							edges{
								node {
									id
								}
							}
						}
					}
				}`,
	  });
	return data;
}
module.exports = {
	getProductById,
};
