const express = require('express')
const router  = express.Router()
const jwt     = require('express-jwt')
// requestProperty는 userProperty로 변경가능하다.
// 결과값은 req내 payload속성에 담겨진다. 기본값은 user이다.
const auth    = jwt({
  secret: process.env.JWT_SECRET,
  requestProperty: 'payload'
})

const ctrlAuth      = require('../controllers/authentication')

// authentication
router.post('/register',  ctrlAuth.register)
router.post('/login',     ctrlAuth.login);

module.exports = router