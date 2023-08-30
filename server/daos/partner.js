const db = require('../models');
const Partner = db.Partner;

/**
 * Create the Partner 
 */
exports.create = async (params) => {
  try {
    const result = await Partner.create({
      name: params.name ,
      logo: params.logo,
    });
    return  result;    
  } catch (error) {
    
    return [error,null];
    
  }
  
}

/**
 * Fetch a Partner
 */
exports.fetch = async (params) => {
  try {
    const result = await Partner.findOne({
      where: params,      
    });
    
    return [err,result];
  } catch (error) {
    return[error,null];
    // throw Error(error);
  }
}

/**
 * Fetch  Partner
 */
exports.fetchAll = async (params) => {
  
  try {
    const result = await Partner.findAll({
      attributes: ['id','name', 'logo'],
      include: [{
        model: db.Task,
        attributes: ['id','credits', 'desc','taskUrl','title'],
        as: 'task',
        where: params.includeCondition
      }],
      where: params.condition,
      order: [ ['createdAt', 'ASC'] ]
    });    
     return result;
    
  } catch (error) {        
    return[error,null];
  }
}

