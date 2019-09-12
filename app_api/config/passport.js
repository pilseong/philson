const passport      = require('passport')
const LocalStrategy = require('passport-local') // passport의 local방식을 사용한다.
const mongoose      = require('mongoose')
const User          = mongoose.model('User')

// 실제 어떤 방식으로 패스포트가 로그인을 처리할지를 정의하는 부분이다.
// local strategy는 username, password를 가지고 로그인을 시도하는데,
// LocalStrategy의 인자로 들어가는 객체에 다른 field로 변경가능하다.
// 아래서는 username대신 email을 사용한다는 의미다.
// 로그인이 시도가 되면(api/login) 
passport.use(new LocalStrategy({ usernameField: 'email' }, 
  function (username, password, done) {
    // 전달된 email을 username으로 하여 db를 검색하여 결과를 callback으로 수신
    User.findOne({ email: username }, (err, user)=>{
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username'
        })
      }
      // 사용자가 있는 경우 password를 비교하여 인증한다.
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password'
        })
      }
      return done(null, user)
    })
  })
)