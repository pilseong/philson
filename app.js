require('dotenv').config()

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');

const passport      = require('passport')   // 패스포트 모듈로드 아래 로드 순서가 중요

require('./app_api/models/db')              // 데이터 베이스 연결
require('./app_api/config/passport')        // 패스포트 설정로드

// REST API Service router
const apiRouter     = require('./app_api/routes/index')
const apiBlog       = require('./app_api/routes/blog')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')))

app.use('/api', (req, res, next)=> {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,\
   Content-Type, Accept, Authorization')
  next()
})

app.use('/api', apiRouter)
app.use('/api/blog', apiBlog)


// 인증관련 에러처리
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({
        "message": err.name + ": " + err.message
      })
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;