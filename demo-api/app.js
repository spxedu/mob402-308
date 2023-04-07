var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session') ;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//sesison đặt trước router
app.use(session({
  secret:'nhvhi3432j43374GBGFnHDNGfy2h3nksjdfh9', // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
  resave:true,
  saveUninitialized:true
}));

 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  // Tùy chỉnh lại render cho phù hợp với API
  // VD: link api: GET  /api/users 
  if(req.originalUrl.indexOf('/api')==0){
      // link bắt đầu bằng /api   là truy cập vào trang API ==> thông báo lỗi kiểu api
      res.json(   {
        status: 0,
        msg: err.message

      }   );
  }else{

    // render the error page
    res.render('error');
  }



});

module.exports = app;
