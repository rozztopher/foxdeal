const db = require('../models');
const Sequelize = require('sequelize')

const User = db.User;

/**
 * Create the User 
 */
exports.create = async (params) => {  
  try {
    const result = await User.create({
      name: params.name,
      email: params.email,
      password: params.bcryptPassword
    });    
    return  [null,result];    
  } catch (error) {
    return [error,null];
  }
  
}

/**
 * Fetch the User
 */
exports.fetch = async (params) => {
  try {
    const result = await User.findOne({      
      include: params.include, 
      where: params.condition
    });
    return [null,result];
  } catch (error) {    
    return[error,null];    
  }
}

/**
   * Update the user
   */
 exports.update= async function(params, condition) {
  try {
    const result = await User.update(
      params,
      { where: condition, returning: true,
        plain: true }
    )
    return [null,result];
  } catch (error) {
    return[error,null];  
  }
}

/**
 * Delete User
 */
 exports.delete = async (params) => {
  
  try {
    const result = await User.destroy({
      where: params
    });
    
    return [null,result];
  } catch (error) {
    return[error,null];
  }
}


/**
 * Complete Task User
 */
 exports.completeTask = async (condition,params) => {
  
  try {
    return db.UserCompletedTask
      .findOne({ where: condition })
      .then(function(obj) {
          // update
          if(obj){
            obj.credits = obj.credits - parseInt(params.credits)
            obj.save();          
            return obj;
          }
            
          // insert
          return db.UserCompletedTask.create(params);
      })   
  } catch (error) {
    return[error,null];
  }
}

/**
 * Delete User Completed Task
 */
 exports.deleteTask = async (params) => {
  
  try {
    const result = await db.UserCompletedTask.destroy({
      where: params
    });
    
    return [null,result];
  } catch (error) {
    return[error,null];
  }
}
/**
 * Fetch  task Ids
 */
 exports.fetchAllTask = async (params) => {
  
  try {
    const result = await db.UserCompletedTask.findAll({
      attributes: ['taskId'],      
      where: params,      
    });    
    return result;    
    
  } catch (error) {        
    return[error,null];
  }
}

