const express = require('express')
const { UserController, FoodController } = require('../controller/controller')
const router = express.Router()

const authentic = require('../middlewares/authentic')
const authorize =  require('../middlewares/authorize')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/foods', authentic, FoodController.getFood )
router.post('/foods', authentic ,FoodController.addFood)
router.delete('/foods', authentic, authorize, FoodController.deleteFood)

module.exports=router