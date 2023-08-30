const { storeFrontClient } = require("./shopifyClient");
async function applyDiscount(checkout_id, discount_code) {
    let query = `mutation {checkoutDiscountCodeApplyV2(checkoutId:"${checkout_id}",discountCode:"${discount_code}")
    {
        checkout{
            id
            totalPriceV2{
                amount
            }
        }
        checkoutUserErrors{
            code
            field
            message
        }
    }}`
    let checkout = await storeFrontClient.query({data:query})
    return checkout

}

module.exports = {
    applyDiscount
}