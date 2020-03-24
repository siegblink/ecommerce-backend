const User = require('../models/user')
// Import json web token to generate signed token
const jwt = require('jsonwebtoken')
// Import express jwt for authorization check
const expressJwt = require('express-jwt')
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

exports.signin = function(req, res) {
  // Find the user based on email
  const { email, password } = req.body
  User.findOne({ email }, function(error, user) {
    if (error || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please sign up.',
      })
    }
    // If user is found, make sure the email and password match
    // Use the authenticate method from the user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: `Email and password don't match`,
      })
    }
    // Generate a signed token with the user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    // Persist the token as 't' in cookie with expiration date
    res.cookie('t', token, { expire: new Date() + 9999 })
    // Return response with the user and token to front-end client
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, email, name, role } })
  })
}

exports.signout = function(req, res) {
  res.clearCookie('t')
  res.json({ message: 'Sign out successful.' })
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
})

exports.isAuth = function(req, res, next) {
  const profileId = JSON.stringify(req.profile._id)
  const authId = JSON.stringify(req.auth._id)
  let userExist = req.profile && req.auth && profileId === authId
  if (!userExist) {
    return res.status(403).json({
      error: 'Access denied',
    })
  }
  next()
}

exports.isAdmin = function(req, res, next) {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: 'Admin resource. Access denied.' })
  }
  next()
}
