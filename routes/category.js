const express = require('express')
const router = express.Router()
const { create } = require('../controllers/category')
const { findUserById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

router.param('userId', findUserById)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)

module.exports = router
