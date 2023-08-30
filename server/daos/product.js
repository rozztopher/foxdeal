const db = require('../models');
const Product = db.Product;

/**
 * Create the Product 
 */
exports.create = async (params) => {
  try {
    const result = await Product.create({
      title: params.title ,
      desc: params.desc ,
      credits: params.credits ,
      price: params.price ,
      shopifyId: params.shopifyId,  
    });
    return  result;    
  } catch (error) {
    
    return [error,null];
    
  }
  
}

/**
 * Fetch the Product
 */
exports.fetch = async (params) => {
  try {
    const result = await Product.findOne({
      where: params,      
    });
    
    return [err,result];
  } catch (error) {
    return[error,null];
    // throw Error(error);
  }
}

/**
 * Fetch User Product
 */
exports.fetchAll = async (params) => {
  
  try {
    const result = await Product.findAll({     
      where: params,
      order: [ ['createdAt', 'DESC'] ]
    });
    return result;
    
    
  } catch (error) {
    return[error,null];
  }
}

