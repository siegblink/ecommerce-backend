const User = require('../models/user')

exports.findUserById = function(req, res, next, id) {
  User.findById(id).exec(function(error, user) {
    if (error || !user) {
      return res.status(400).json({
        error: 'User not found.',
      })
    } else {
      req.profile = user
      next()
    }
  })
}
