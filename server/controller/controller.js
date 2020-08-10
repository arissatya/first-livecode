const { User, Food } = require('../models/index')
const {comparePassword} = require('../helper/hashPassword')
const userToken = require('../helper/jwt')

class UserController {
  static register(req,res,next){
    User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(data=>{
      res.status(201).json({
        id:data.id,
        email:data.email,
      })
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static login(req,res,next){
    let payload = {
      email: req.body.email,
      password: req.body.password,
    }
    try {
      User.findOne({
        where: {
          email:payload.email
        }
      })
      .then(user=>{
        if(user){
          const valid = comparePassword(payload.password,user.password)
          if(valid){
            let access_token = userToken(user.email)
            res.status(200).json({
              access_token
            })
          } else {
            throw err
          }
        } else {
          throw err
        }
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

class FoodController {
  static getFood(req,res,next){

  }

  static addFood(req,res,next){
    let input = {
      title: req.body.title,
      price: req.body.price,
      ingredients: req.body.ingredients,
      tag: req.body.tag,
      UserId: req.userId,
    }
    Food.create(input)
    .then(data=>{
      res.status(201).json({
        id: data.id,
        title: data.title,
        price: data.price,
        ingredients: data.ingredients,
        tag: data.tag,
        UserId: data.UserId,
      })
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
}

module.exports = { UserController, FoodController }