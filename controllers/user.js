const User = require('../models/user')

exports.signup = function(req, res) {
  console.log(req.body)
  const user = new User(req.body)
  user.save(function(error, user) {
    if (error) {
      return res.status(400).json({ error })
    }
    res.json({ user })
  })
}
