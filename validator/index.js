const { check, validationResult } = require('express-validator')

exports.validators = [
  check('name')
    .notEmpty()
    .withMessage('Name is required.'),
  check('email')
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage('Email must be between 3 to 32 characters.')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @ symbol.'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters.')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
]

exports.userSignupValidator = function(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const [msg] = errors.array().map(error => error.msg)
    res.status(422).json({ errors: msg })
  } else {
    next()
  }
}
