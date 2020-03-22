const express = require('express')
const router = express.Router()

const { signup } = require('../controllers/user')
const { validators, userSignupValidator } = require('../validator')

router.post('/signup', validators, userSignupValidator, signup)

module.exports = router
