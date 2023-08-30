const db = require('../models');
const Transaction = db.Transaction;


/**
 * Create the Transaction 
 */
exports.create = async (params) => {
  try {
    const result = await Transaction.create({
      discountCredits: params.discountCredits,
      totalPrice: params.totalPrice,
      userId: params.userId
    });
    return  result;    
  } catch (error) {
    
    return [error,null];
    
  }
  
}

/**
 * Fetch a Transaction
 */
exports.fetch = async (params) => {
  try {
    const result = await Transaction.findOne({
      where: params,      
    });
    
    return [err,result];
  } catch (error) {
    return[error,null];
    // throw Error(error);
  }
}

/**
 * Fetch all Transaction
 */
exports.fetchAll = async (params) => {
  
  try {
    const result = await Transaction.findAll({
      where: params.condition,
      order: [ ['createdAt', 'DSC'] ]
    });    
     return result;
    
  } catch (error) {        
    return[error,null];
  }
}

