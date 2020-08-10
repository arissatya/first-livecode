const { Food } = require('../models/index')

function authorize(req, res, next) {
  Food.findByPk(req.userId)
    .then(user => {

    })
}