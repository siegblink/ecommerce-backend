const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = function(req, res) {
  console.log(req.body)
  const user = new User(req.body)
  user.save(function(error, user) {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) })
    }
    user.hashed_password = undefined
    user.salt = undefined
    res.json({ user })
  })
}
