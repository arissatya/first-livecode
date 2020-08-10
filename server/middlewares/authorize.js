const { Food } = require('../models/index')

function authorize(req, res, next) {
  Food.findByPk(req.userId)
    .then(user => {
      if(user){
        if(user.UserId === req.userId)
        next()
      } else {
        res.status(401).json({
          msg: 'Unathourized'
        })
      }
    })
    .catch(err=>{
      res.status(500).json(err)
    })
}

module.exports=authorize