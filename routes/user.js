const express = require('express')
const router = express.Router()

const { signup, signin, signout } = require('../controllers/user')
const { requireSignin } = require('../controllers/user')
const { validators, userSignupValidator } = require('../validator')

router.post('/signup', validators, userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router
