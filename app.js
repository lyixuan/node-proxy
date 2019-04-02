var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');
var history = require('connect-history-api-fallback');
// 用于格式化输出日志
var logger = require('morgan');
var proxyConfig = require('./src/proxy/index');
var oldApiConfig = require('./src/proxy/oldApi');
var tmpApiConfig = require('./src/proxy/oldApi');



var app = express();

//设置跨域请求头,
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   if (req.method == 'OPTIONS') {
//     //让options请求快速返回
//     res.sendStatus(200);
//   } else {
//     next();
//   }
//   next();
// });


app.use(logger('dev'));
app.use(express.json());
// 它基于body-parser解析传入的请求为urlencoded格式
app.use(express.urlencoded({ extended: false }));
// 处理传递cookie的解析问题
app.use(cookieParser());
// 处理在body传递数据中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 测试接口
app.get('api/test', (req, res) => {
  res.cookie('testName', 'testValue');
  return res.json({ text: '1112ss2' });
})

// 设置代理接口
app.use('/proxy', proxy(proxyConfig));
// 原始代理接口
app.use('/oldApi', proxy(oldApiConfig));
// 临时代理
app.use('/tmpApi', proxy(tmpApiConfig));

// 设置静态页面的history模式,根目录为/inspector,
app.use(history());
app.use('/inspector', express.static(path.join(__dirname, 'inspector')))
app.use(express.static(path.join(__dirname, 'inspector')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ code: err.status, msg: "服务器异常" });
});

module.exports = app;