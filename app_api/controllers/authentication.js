const passport  = require('passport')
const mongoose  = require('mongoose')
const User      = mongoose.model('User')

const register = (req, res)=> {
  console.log("Server -- api -- register with " + JSON.stringify(req.body))
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({
        "message": "All fields required"
      })
  }
  const user = new User()
  user.name = req.body.name
  user.email = req.body.email
  user.setPassword(req.body.password)
  user.save((err)=> {
    if (err) {
      res
        .status(404)
        .json(err)
    } else {
      const token = user.generateJwt()    // jwt생성
      res
        .status(200)
        .json({token})
    }
  })
}


// /api/login으로 호출된 경우
const login = (req, res)=> {
  if (!req.body.email || !req.body.password) {
    return res
      .status(404)
      .json({
        "message": "All fields required"
      })
  }
  // 정상적으로 email과 password가 주어졌을 때
  passport.authenticate('local', (err, user, info)=> {
    let token
    if (err) {
      return res
        .status(404)
        .json(err)
    }
    if (user) {
      token = user.generateJwt()
      res
        .status(200)
        .json({token})
    } else {
      res
        .status(401)
        .json(info)
    }
  })(req, res)
}

module.exports = {
  register,
  login
}