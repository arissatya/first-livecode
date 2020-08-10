const express = require('express')
const { UserController, FoodController } = require('../controller/controller')
const router = express.Router()

const authentic = require('../middlewares/authentic')
// const authorize =  require('')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/foods', FoodController.getFood )
router.post('/foods', authentic ,FoodController.addFood)

module.exports=router