const PurchasedProduct = require('../models').PurchasedProduct;


/**
 * Create the PurchasedProduct 
 */
exports.create = async (params) => {
  try {
    const result = await PurchasedProduct.create({
      transactionId: params.transactionId ,
      productId: params.productId      
    });    
    return  result;    
  } catch (error) {
    console.log(error)
    return [error,null];
    
  }
  
}

/**
 * Fetch the PurchasedProduct
 */
exports.fetch = async (params) => {
  try {
    const result = await PurchasedProduct.findOne({
      where: params,      
    });
    
    return [err,result];
  } catch (error) {
    return[error,null];   
  }
}

/**
 * Fetch User Product
 */
exports.fetchAll = async (params) => {
  
  try {
    const result = await PurchasedProduct.findAll({     
      where: params,
      order: [ ['createdAt', 'DESC'] ]
    });
    return result;
    
    
  } catch (error) {
    return[error,null];
  }
}

