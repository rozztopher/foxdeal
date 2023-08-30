const db = require('../models');
const Task = db.Task;

/**
 * Create the Task 
 */
exports.create = async (params) => {
  try {
    const result = await Task.create({

      credits: params.credits ,
      partnerId:params.partnerId, 
      desc: params.desc,
      taskUrl: params.taskUrl
      
    });
    return  result;    
  } catch (error) {
    
    return [error,null];
    
  }
  
}

/**
 * Fetch the Task
 */
exports.fetch = async (params) => {
  try {
    const result = await Task.findOne({
      where: params,      
    });
    
    return [err,result];
  } catch (error) {
    return[error,null];
    // throw Error(error);
  }
}

/**
 * Fetch User Task
 */
exports.fetchAll = async (params) => {
  
  try {
    const result = await Task.findAll({
      // attributes: ['name'],
      
      where: params,
      order: [ ['createdAt', 'DESC'] ]
    });
    return result;
    
    
  } catch (error) {
    return[error,null];
  }
}

