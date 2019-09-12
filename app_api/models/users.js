const mongoose  = require('mongoose')
const crypto    = require('crypto')
const jwt       = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
})

// 패스워드를 받아 salt와 hash값을 생성한다.
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

// client로 부터 수신한 password가 일치하는지를 확인한다.
userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
  return this.hash === hash
}

// jwt르 생성해 주는 함수로 sign함수에 id, email, name, exp가 모두 들어 있다.
// 이 데이터를 가지고 클라이언트는 내부적으로 활용할 수 있다.
userSchema.methods.generateJwt = function() {
  const expiry = new Date()
  expiry.setDate(expiry.getDate()+7)
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000, 10)
  }, process.env.JWT_SECRET)
}

mongoose.model('User', userSchema)