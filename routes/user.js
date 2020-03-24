const express = require('express')
const router = express.Router()
const { findUserById } = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')

router.param('userId', findUserById)
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, function(req, res) {
  res.json({
    user: req.profile,
  })
})

module.exports = router
