const express = require('express')
const { UserController, FoodController } = require('../controller/controller')
const router = express.Router()

// const athentic = require('')
// const athorize =  require('')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports=router