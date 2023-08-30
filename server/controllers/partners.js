const Op = require('sequelize').Op
const partnerDao = require('../daos/partner');
const usersDao = require('../daos/user');

/*
* Get All Partners. 
*/
exports.all = async (req, res) =>{
    try {
      const {userId} = req.query;       
      let partners, err, ids = []
      if(userId){
      const  ids =  await usersDao.fetchAllTask({userId: userId}); 
       let  taskIds = await ids.map(item=> item.taskId);
          partners =  await partnerDao.fetchAll({condition: {}, includeCondition: {id:{ [Op.notIn]: taskIds}} });    
      if (err) return res.status(401).json(err)
      }else{
         partners =  await partnerDao.fetchAll({});    
      if (err) return res.status(401).json(err)
      }    
      return res.json({partners})
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
}
/*
* Get Partner with id. 
*/
exports.get = async (req, res) =>{
    try {        
      const  [err,partner] = await partnerDao.fetch({id: req.params.id});       
      if(err) return res.status(401).json(err)      
      return res.json({ partner })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
}

/*
* Complete a partner task. 
*/

exports.completeTask = async (req, res) =>{
  try {        
    const  [err,partners] = await partnerDao.fetchAll({
      includeCondition: {
        
      }
    });      
    if (err) return res.status(401).json(err)
    return res.json({partners})
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}