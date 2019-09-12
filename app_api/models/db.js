const mongoose = require('mongoose')
const readLine = require('readline')

// 윈도우 운영체제가 SIGINT를 발생시키지 못하기 때문에 임의로 발생시키는 부분
if (process.platform === 'win32') {
  const r1= readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  r1.on('SIGINT', ()=> {
    process.emit("SIGINT")
  })
}

// 데이터베이스 연결을 종료시키는 부분
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(()=> {
    console.log(`Mongoose disconnected throught ${msg}`)
    callback();
  })
}

// nodemon을 사용하고 있는 경우 서버 재기동을 처리한다.
// 윈도우에서는 정상적으로 동작하지 않는다.
process.once('SIGUSR2', ()=> {
  gracefulShutdown('nodemon restart', ()=> {
    process.kill(process.pid, 'SIGUSR2');
  })
})

// 윈도우에서 앱을 종료시켰을 때 실행된다.
process.on('SIGINT', ()=> {
  gracefulShutdown('app termination', ()=> {
    process.exit(0)
  })
})

// Heroku 서비스는 SIGTERM이 종료시 발생한다.
process.once('SIGTERM', ()=> {
  gracefulShutdown('Heroku app shutdown', ()=> {
    process.exit(0)
  })
})

let dbURI = 'mongodb://localhost/Blog'   // 로컬 데이터 베이스
if (process.env.NODE_ENV === 'production') {  // heroku 서버에서 atlas로 접속
  dbURI = 'mongodb+srv://heops79:123123a@loc8r-xa85b.mongodb.net/blog?retryWrites=true&w=majority'
}
mongoose.connect(dbURI, { useNewUrlParser: true })


// 아래는 접속이 되거나 끊겼을 때 로그를 보여 주는 부분이다.
mongoose.connection.on('connected', ()=> {
  console.log(`Mongoose connected to ${dbURI}`)
})

mongoose.connection.on('error', err=> {
  console.log('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', ()=> {
  console.log('Mongoose disconnected')
})

require('./users')
require('./articles')