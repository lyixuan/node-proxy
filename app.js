var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');
var history = require('connect-history-api-fallback');
// 用于格式化输出日志
var logger = require('morgan');
var proxyConfig=require('./src/proxy/index');



var app = express();
app.use(logger('dev'));
app.use(express.json());
// 它基于body-parser解析传入的请求为urlencoded格式
app.use(express.urlencoded({ extended: false }));
// 处理传递cookie的解析问题
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 处理在body传递数据中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 测试接口
app.get('/api',(req,res)=>{
    res.cookie('testName', 'testValue');
    return res.json({code:11122});
})

// 设置代理接口
app.use('/proxy',proxy(proxyConfig));
// 设置静态页面的history模式
app.use(history());
app.get("/inspector", function(req, res) {
  res.sendFile(path.join(__dirname, "public/inspector/index.html"))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({code:err.status,msg:"服务器异常"});
});

module.exports = app;