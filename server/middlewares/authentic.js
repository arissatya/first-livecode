const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

function authentic(req, res, next) {
  const payload = jwt.verify(req.headers.access_token, 'rahasia')

  User.findOne({
    where: { email: payload }
  })
    .then(user => {
      if (user) {
        req.userId = user.id
        next()
      } else {
        res.status(401).json({
          msg: "Unathorized"
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = authentic