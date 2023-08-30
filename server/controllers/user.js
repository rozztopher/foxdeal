const base64url = require('base64url');
const usersDao = require('../daos/user');
const transactionDao = require('../daos/transaction');
const productPurchasedDao = require('../daos/productPurchased');
const {applyDiscount} = require('../shopify/discounts')
const {createCheckout,completeCheckout} = require('../shopify/checkouts')
const {parseCustomerCard,parseCustomerPersonalInfo} = require('../utils/userInput')
const db = require ('../models');
const { getProductById } = require('../shopify/products');
/*
* Update user profile. 
*/
exports.update = async (req, res) =>{
    try {
      const {name, email, phone, dob, country, city, street, zip } = req.body 
      let  [err,user] = await usersDao.update({name, email, phone, dob, country, city, street, zip},{id: req.user.id});      
      if (err) return res.status(401).json('Email already exists!')      
      user= user[user.length- 1].dataValues
      delete user.password;
      return res.json({user})
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
}



/*
* Update user profile. 
*/
exports.updateCredits = async (req, res) =>{
    try {
      const {credits } = req.body 
      const  [err,user] = await usersDao.update({credits},{id: req.user.id});       
      if (err) return res.status(401).json('credits not updated!')
      return res.json({ user })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
}


/*
* Get user profile. 
*/
exports.get = async (req, res) =>{
    try {        
      const  [err,user] = await usersDao.fetch({condition: {id: req.user.id}});       
      if(err) return res.status(401).json('user not exists')
      delete user.password;
      return res.json({ user })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
}

/*
* Delete user profile. 
*/

exports.delete = async (req, res) =>{
    try {        
      const  [err,user] = await usersDao.delete({id: req.user.id});       
      if(err) return res.status(401).json('user not exists')      
      return res.json("User was deleted");
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
}

/*
* Get User Completed Tasks 
*/

exports.completedTasks = async (req, res) =>{
  try {        
    const  [err,user] = await usersDao.fetch({
      condition: {id: req.user.id},
      include: [{
      model: db.Task,
      as: 'completedTasks',
      through: {
        attributes: ['credits']
      },
      include: [{ 
        model: db.Partner
      }]
    }]});       
    if(err) return res.status(401).json('user not exists')      
    let partners=[]
    if(user.completedTasks.length> 0){
      user.completedTasks.forEach(element => {
        if(element.UserCompletedTask.credits > 0) {
          partners.push({
            id: element.Partner.id,
            name: element.Partner.name,
            logo: element.Partner.logo,
            task: {
              id:element.id, 
              credits: element.UserCompletedTask.credits,
              desc:element.desc,
              taskUrl:element.taskUrl,
              title:element.title,
              
            }
          })
        }        
      });
    }
    return res.json({tasks: partners});
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}

/*
* Get User Completed Tasks 
*/

exports.updateCompletedTask = async (req, res) =>{
  try {
    const {taskId,credits } = req.body;
    let  [err,user] = await usersDao.fetch({condition:{id: req.user.id}});
    await usersDao.completeTask({userId:  req.user.id,taskId: taskId},{userId:  req.user.id,taskId: taskId , credits: credits });
    user.credits = user.credits+ parseInt(credits);
    await user.save();
    delete user.password;
    if(err) return res.status(401).json('user not exists')      
    return res.json(user);
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}


/*
* Get User Checkout 
*/

exports.checkout = async (req, res) =>{
  try {
    const {credits, totalCoins, products, partnerCoins ,cartInfo} = req.body;
    console.log(cartInfo)
    for (var key in partnerCoins) { 
      await usersDao.completeTask({userId: req.user.id, taskId: key},{ credits: credits });
    }
    
    let  [err,user] = await usersDao.fetch({condition:{id: req.user.id}});
    if(err) return res.status(401).json('user not exists')
    if (parseInt(credits)> user.dataValues.credits) return res.status(401).json('You dont have enough tokens!');
    const transaction =  await transactionDao.create({discountCredits: credits,totalPrice: totalCoins,userId: req.user.id})
    // shopify start
    let card = parseCustomerCard(cartInfo)
    let parsedUserInfo = parseCustomerPersonalInfo(user)
    let variants = await getProductById(products[0])
    let variant_id = variants.body.data.product.variants.edges[0].node.id
    console.log(variant_id)
    // we will get a list of variants ids instead of products[]
    // create a checkout for the first one
    // then add other line items to the checkout using createAddLineItemToCheckoutQueryString
    let checkout = await createCheckout(parsedUserInfo,variant_id)
    console.log(card,parsedUserInfo,checkout.body.data.checkoutCreate.checkoutUserErrors,products[0])
    if(credits > 0){
        let checkout_id = checkout.body.data.checkoutCreate.checkout.id;
        await applyDiscount(checkout_id,"sanitas")
    }
    completeCheckout(checkout,parsedUserInfo,card,1129.00)
    // shopify end



    products.forEach(productId => productPurchasedDao.create({transactionId: transaction.id, productId: productId }))
    user.credits = user.credits -  parseInt(credits);
    await user.save();      
    delete user.password;
    return res.json(user);
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}